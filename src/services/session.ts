import axios, { AxiosRequestConfig } from 'axios'
import { API_V1, API_V2 } from './constants'
import { Profile } from '../types'

type FailureKind = 'credentials' | 'expired' | 'network' | 'server' | 'rate-limit' | 'stale'
export class SessionFailure extends Error {
  readonly isAxiosError = true
  readonly response?: { status: number; data: Record<string, never> }
  constructor(readonly kind: FailureKind, status?: number) {
    super(kind)
    this.name = 'SessionFailure'
    if (status) this.response = { status, data: {} }
  }
}
export function sessionErrorMessage(error: unknown): string {
  const kind = error instanceof SessionFailure ? error.kind : 'server'
  return {
    credentials: 'Adresse e-mail ou mot de passe incorrect.',
    expired: 'Session expirée. Veuillez vous reconnecter.',
    network: 'Connexion réseau indisponible. Réessayez.',
    server: 'Service indisponible. Réessayez plus tard.',
    'rate-limit': 'Trop de tentatives. Veuillez patienter avant de réessayer.',
    stale: 'La session a changé. Veuillez réessayer.'
  }[kind]
}
function failure(error: unknown, login = false): SessionFailure {
  if (error instanceof SessionFailure) return error
  if (!axios.isAxiosError(error)) return new SessionFailure('server')
  const status = error.response?.status
  return new SessionFailure(status === 429 ? 'rate-limit' : status === 401 || status === 409 ? (login ? 'credentials' : 'expired') : status === 400 && login ? 'credentials' : status ? 'server' : 'network', status)
}
interface Pair {
  session_id: string; access_token: string; refresh_token: string; token_type: 'Bearer'
  access_expires_at: string; refresh_expires_at: string; session_expires_at: string; expires_in: number
}
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
function parsePair(value: unknown, parent?: Pair): Pair {
  const p = value as Pair
  const now = Date.now()
  if (!p || !uuid.test(p.session_id) || p.token_type !== 'Bearer' ||
    typeof p.access_token !== 'string' || !p.access_token.trim() || /\s/.test(p.access_token) ||
    typeof p.refresh_token !== 'string' || !p.refresh_token.trim() || /\s/.test(p.refresh_token) ||
    !Number.isInteger(p.expires_in) || p.expires_in < 0 ||
    ![p.access_expires_at, p.refresh_expires_at, p.session_expires_at].every(t => typeof t === 'string' && Number.isFinite(Date.parse(t))) ||
    Date.parse(p.access_expires_at) <= now || Date.parse(p.refresh_expires_at) <= now ||
    Date.parse(p.access_expires_at) > Date.parse(p.refresh_expires_at) ||
    Date.parse(p.refresh_expires_at) > Date.parse(p.session_expires_at) ||
    (parent && (p.session_id !== parent.session_id || p.session_expires_at !== parent.session_expires_at || p.refresh_token === parent.refresh_token))) throw new SessionFailure('server')
  return p
}
let pair: Pair | null = null
let profile: Profile | null = null
let generation = 0
let initialToken: string | null = null
let notice = ''
let recovering = false
let expirationTimer: ReturnType<typeof setTimeout> | undefined
let refreshFlight: Promise<Pair> | null = null
let refreshController: AbortController | null = null
interface RefreshDescriptor { parent: Pair; id: string; startedAt: number }
let pendingRefresh: RefreshDescriptor | null = null
const listeners = new Set<() => void>()
export const sessionSnapshot = () => ({ token: profile ? initialToken : null, generation, notice, recovering })
export const sessionProfile = () => profile
export const subscribeSession = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener) } }
function emit() { listeners.forEach(listener => listener()) }
export function clearSession(message = '', notify = true): void {
  clearTimeout(expirationTimer)
  recovering = false
  generation++
  pair = null
  profile = null
  initialToken = null
  notice = message
  refreshController?.abort()
  refreshController = null
  refreshFlight = null
  pendingRefresh = null
  if (notify) emit()
}
export function checkSessionExpiry(): void {
  if (pair && Date.now() >= Date.parse(pair.session_expires_at)) clearSession(sessionErrorMessage(new SessionFailure('expired')))
}
function scheduleExpiry(): void {
  clearTimeout(expirationTimer)
  if (!pair) return
  expirationTimer = setTimeout(() => { checkSessionExpiry(); if (pair) scheduleExpiry() }, Math.min(2147483647, Math.max(0, Date.parse(pair.session_expires_at) - Date.now())))
}
export function removeLegacyToken(): void {
  try { localStorage.removeItem('token') } catch { /* No persistent storage is required. */ }
  try { sessionStorage.removeItem('token') } catch { /* No persistent storage is required. */ }
}
function checkGeneration(expected: number): void {
  if (generation !== expected) throw new SessionFailure('stale')
}
function requestId(): string {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  bytes[6] = (bytes[6] & 15) | 64
  bytes[8] = (bytes[8] & 63) | 128
  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}
/** A captured operation may recover a rotated pair solely to revoke it after local purge. */
async function recoverPair(descriptor: RefreshDescriptor, controller: AbortController, check = () => {}): Promise<Pair> {
  const { parent, id, startedAt } = descriptor
  const deadline = Math.min(startedAt + 60000, Date.parse(parent.refresh_expires_at), Date.parse(parent.session_expires_at))
  for (let attempt = 0; attempt < 3; attempt++) {
    check()
    if (controller.signal.aborted) throw new SessionFailure('stale')
    if (Date.now() >= deadline) throw new SessionFailure('expired')
    try {
      const result = await axios.post(`${API_V2}/auth/sessions/refresh/`, { refresh_token: parent.refresh_token, request_id: id }, {
        timeout: Math.min(10000, deadline - Date.now()), signal: controller.signal
      })
      check()
      if (controller.signal.aborted) throw new SessionFailure('stale')
      if (Date.now() >= deadline || result.status !== 200) throw new SessionFailure('expired')
      return parsePair(result.data, parent)
    } catch (raw) {
      check()
      if (controller.signal.aborted) throw new SessionFailure('stale')
      const error = failure(raw)
      if (!['network', 'server', 'rate-limit'].includes(error.kind) || attempt === 2) throw error
      const header = axios.isAxiosError(raw) ? raw.response?.headers?.['retry-after'] : undefined
      const seconds = header == null ? NaN : Number(header)
      const retryAt = typeof header === 'string' ? Date.parse(header) : NaN
      const delay = error.kind === 'rate-limit' ? (Number.isFinite(seconds) ? seconds * 1000 : Number.isFinite(retryAt) ? Math.max(0, retryAt - Date.now()) : 3000) : [1000, 3000][attempt]
      if (delay < 0 || Date.now() + delay >= deadline) throw error
      await new Promise<void>((resolve, reject) => {
        const abort = () => { clearTimeout(timer); reject(new SessionFailure('stale')) }
        const timer = setTimeout(() => { controller.signal.removeEventListener('abort', abort); resolve() }, delay)
        controller.signal.addEventListener('abort', abort, { once: true })
        if (controller.signal.aborted) abort()
      })
    }
  }
  throw new SessionFailure('expired')
}
async function refresh(expected: number): Promise<Pair> {
  checkGeneration(expected)
  if (refreshFlight) return refreshFlight
  if (!pair) throw new SessionFailure('expired')
  const descriptor = { parent: pair, id: requestId(), startedAt: Date.now() }
  pendingRefresh = descriptor
  const controller = new AbortController()
  recovering = true
  emit()
  refreshController = controller
  const operation = recoverPair(descriptor, controller, () => checkGeneration(expected)).then(next => {
    checkGeneration(expected)
    pair = next
    return next
  })
  refreshFlight = operation
  try { return await operation } catch (error) {
    if (generation === expected) clearSession(sessionErrorMessage(error))
    throw error
  } finally {
    if (refreshFlight === operation) { refreshFlight = null; refreshController = null; pendingRefresh = null; recovering = false; emit() }
  }
}
export async function privateRequest<T>(config: AxiosRequestConfig): Promise<{ data: T }> {
  const expected = generation
  const supplied = String(config.headers?.Authorization ?? '').replace(/^Bearer /, '')
  if (!pair || supplied !== initialToken) throw new SessionFailure('stale')
  try {
    for (let attempt = 0; attempt < 2; attempt++) {
      checkGeneration(expected)
      if (!pair) throw new SessionFailure('expired')
      if (Date.now() >= Date.parse(pair.session_expires_at)) throw new SessionFailure('expired')
      if (Date.now() >= Date.parse(pair.access_expires_at)) await refresh(expected)
      checkGeneration(expected)
      const sent: string = pair!.access_token
      try {
        const response = await axios.request<T>({ ...config, timeout: 15000, headers: { ...config.headers, Authorization: `Bearer ${sent}` } })
        checkGeneration(expected)
        checkSessionExpiry()
        checkGeneration(expected)
        return { data: response.data }
      } catch (raw) {
        checkGeneration(expected)
        if (axios.isAxiosError(raw) && raw.response?.status === 401) {
          if (attempt === 1) throw new SessionFailure('expired', 401)
          // A late 401 from the previous access joins the already completed rotation.
          if (pair?.access_token === sent) await refresh(expected)
          continue
        }
        throw failure(raw)
      }
    }
    throw new SessionFailure('expired')
  } catch (error) {
    const clean = failure(error)
    if (clean.kind === 'expired' && generation === expected) clearSession(sessionErrorMessage(clean))
    throw clean
  }
}
export const privateApi = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) => privateRequest<T>({ ...config, url, method: 'GET' }),
  post: <T = any>(url: string, data?: unknown, config?: AxiosRequestConfig) => privateRequest<T>({ ...config, url, data, method: 'POST' }),
  patch: <T = any>(url: string, data?: unknown, config?: AxiosRequestConfig) => privateRequest<T>({ ...config, url, data, method: 'PATCH' }),
  delete: <T = any>(url: string, config?: AxiosRequestConfig) => privateRequest<T>({ ...config, url, method: 'DELETE' })
}
export async function loginSession(email: string, password: string): Promise<{ token: string }> {
  clearSession('', profile !== null)
  const expected = generation
  try {
    const result = await axios.post(`${API_V2}/auth/sessions/`, { email, password, device_label: 'OrdoPro navigateur' }, { timeout: 15000 })
    checkGeneration(expected)
    if (result.status !== 201) throw new SessionFailure('server')
    pair = parsePair(result.data)
    initialToken = pair.access_token
    const response = await privateApi.get<Profile>(`${API_V1}/profile/`, { headers: { Authorization: `Bearer ${initialToken}` } })
    checkGeneration(expected)
    const p = response.data
    if (!p || !Number.isSafeInteger(p.id) || p.id <= 0 || typeof p.email !== 'string' || !['first_name', 'last_name', 'username'].every(key => typeof p[key as keyof Profile] === 'string')) throw new SessionFailure('server')
    profile = p
    scheduleExpiry()
    emit()
    return { token: initialToken! }
  } catch (raw) {
    const error = failure(raw, true)
    if (generation === expected) clearSession(sessionErrorMessage(error))
    throw error
  }
}
export async function logoutSession(): Promise<void> {
  const captured = pair
  const capturedRefresh = pendingRefresh
  clearSession()
  const expected = generation
  if (!captured) return
  const revoke = async (access: string): Promise<void> => {
    const result = await axios.delete(`${API_V2}/auth/sessions/current/`, { timeout: 10000, headers: { Authorization: `Bearer ${access}` } })
    if (result.status !== 204) throw new SessionFailure('server')
  }
  try {
    try { await revoke(captured.access_token) } catch (raw) {
      if (!axios.isAxiosError(raw) || raw.response?.status !== 401) throw raw
      // This pair is used ONLY by this detached revocation. Never install it or emit auth state.
      const descriptor = capturedRefresh ?? { parent: captured, id: requestId(), startedAt: Date.now() }
      const revocationPair = await recoverPair(descriptor, new AbortController())
      await revoke(revocationPair.access_token)
    }
  } catch {
    if (generation === expected) { notice = 'Déconnexion locale effectuée. La révocation sur le serveur n’a pas pu être confirmée.'; emit() }
  }
}
export async function publicRequest<T>(operation: () => Promise<{ data: T }>): Promise<T> {
  try { return (await operation()).data } catch (error) { throw failure(error) }
}

export async function confirmSessionReset(operation: () => Promise<{ status: number; data: unknown }>): Promise<{}> {
  const expected = generation
  try {
    const result = await operation()
    checkGeneration(expected)
    if (result.status !== 204) throw new SessionFailure('server')
    clearSession()
    return {}
  } catch (error) { throw failure(error) }
}
