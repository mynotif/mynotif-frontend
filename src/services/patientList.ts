import { PatientPage, PatientQuery, PatientSummary } from '../types'
import { API_V2 } from './constants'
import { privateApi, SessionFailure, sessionErrorMessage } from './session'

const PAGE_KEYS = ['count', 'page', 'page_size', 'next_page', 'previous_page', 'results']
const SUMMARY_KEYS = ['id', 'firstname', 'lastname', 'city', 'phone', 'birthday']
const STRING_LIMITS = { firstname: 30, lastname: 30, city: 300, phone: 30 }

function record(value: unknown, keys: string[]): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value) ||
    Object.keys(value).length !== keys.length || keys.some(key => !(key in value))) {
    throw new SessionFailure('server')
  }
  return value as Record<string, unknown>
}

function validBirthday(value: unknown): boolean {
  if (value === null) return true
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00.000Z`)
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
}

function summary(value: unknown): PatientSummary {
  const row = record(value, SUMMARY_KEYS)
  if (!Number.isSafeInteger(row.id) || Number(row.id) <= 0 || !validBirthday(row.birthday) ||
    Object.entries(STRING_LIMITS).some(([key, limit]) =>
      typeof row[key] !== 'string' || Array.from(row[key] as string).length > limit)) {
    throw new SessionFailure('server')
  }
  return row as unknown as PatientSummary
}

export async function getPatientPage(
  token: string, { page = 1, pageSize = 20, search = '' }: PatientQuery = {}, signal?: AbortSignal
): Promise<PatientPage> {
  if (!Number.isInteger(page) || page < 1 || page > 2147483647 ||
    !Number.isInteger(pageSize) || pageSize < 1 || pageSize > 100 ||
    typeof search !== 'string' || Array.from(search).length > 100) throw new SessionFailure('server')
  const response = await privateApi.get<unknown>(`${API_V2}/patients/`, {
    headers: { Authorization: `Bearer ${token}` }, params: { page, page_size: pageSize, search }, signal
  })
  const body = record(response.data, PAGE_KEYS)
  if (!Number.isSafeInteger(body.count) || Number(body.count) < 0 || body.page !== page ||
    body.page_size !== pageSize || !Array.isArray(body.results)) throw new SessionFailure('server')
  const count = Number(body.count)
  const last = Math.max(1, Math.ceil(count / pageSize))
  const length = Math.min(pageSize, Math.max(0, count - (page - 1) * pageSize))
  if (page > last || body.next_page !== (page < last ? page + 1 : null) ||
    body.previous_page !== (page > 1 ? page - 1 : null) || body.results.length !== length) {
    throw new SessionFailure('server')
  }
  return { count, page, page_size: pageSize, next_page: body.next_page as number | null,
    previous_page: body.previous_page as number | null, results: body.results.map(summary) }
}

export function patientReadStatus(error: unknown): number | undefined {
  return (error as { response?: { status?: number }; status?: number } | null)?.response?.status ??
    (error as { status?: number } | null)?.status
}

export function patientListErrorMessage(error: unknown): string {
  if (patientReadStatus(error) === 404) return 'Cette page de patients n’existe plus. Revenez à la première page.'
  return sessionErrorMessage(error)
}
