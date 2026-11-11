import { PatientDetail, PatientPrescription } from '../types'
import { SessionFailure } from './session'

export type PatientReadStatus = 'loading' | 'ready' | 'missing' | 'network' | 'rate-limit' | 'server' | 'invalid'
export class InvalidPatientDetail extends Error {
  constructor() { super('Invalid patient dossier'); this.name = 'InvalidPatientDetail' }
}
export function patientId(value: string | undefined): number | null {
  const id = value && /^[0-9]+$/.test(value) ? Number(value) : NaN
  return Number.isSafeInteger(id) && id > 0 ? id : null
}
const failureStatuses: Partial<Record<SessionFailure['kind'], PatientReadStatus>> = {
  network: 'network', 'rate-limit': 'rate-limit'
}
export function patientReadFailure(error: unknown): PatientReadStatus {
  if (error instanceof InvalidPatientDetail) return 'invalid'
  if (error instanceof SessionFailure) {
    if (error.response?.status === 404) return 'missing'
    return failureStatuses[error.kind] ?? 'server'
  }
  return 'server'
}
function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new InvalidPatientDetail()
  return value as Record<string, unknown>
}
function text(value: unknown): string {
  if (typeof value !== 'string') throw new InvalidPatientDetail()
  return value
}
function nullableText(value: unknown): string | null {
  return value === null ? null : text(value)
}
function date(value: unknown): string | null {
  if (value === null) return null
  const day = text(value)
  const timestamp = Date.parse(`${day}T00:00:00Z`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || !Number.isFinite(timestamp) ||
      new Date(timestamp).toISOString().slice(0, 10) !== day) throw new InvalidPatientDetail()
  return day
}
function positiveId(value: unknown): number {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value <= 0) throw new InvalidPatientDetail()
  return value
}
function boolean(value: unknown): boolean {
  if (typeof value !== 'boolean') throw new InvalidPatientDetail()
  return value
}
function prescriptions(value: unknown, id: number): PatientPrescription[] {
  if (!Array.isArray(value)) throw new InvalidPatientDetail()
  return value.map(item => {
    const p = record(item)
    if (p.patient !== id) throw new InvalidPatientDetail()
    return {
      id: positiveId(p.id), patient: id, prescribing_doctor: text(p.prescribing_doctor),
      email_doctor: nullableText(p.email_doctor), start_date: date(p.start_date), end_date: date(p.end_date),
      photo_prescription: text(p.photo_prescription), is_valid: boolean(p.is_valid),
      expiring_soon: boolean(p.expiring_soon)
    }
  })
}
/** The v1 dossier embeds legacy prescriptions, without expanded patient names. */
export function parsePatientDetail(value: unknown, expectedId: number): PatientDetail {
  const p = record(value)
  const id = positiveId(p.id)
  if (id !== expectedId) throw new InvalidPatientDetail()
  return {
    id, firstname: text(p.firstname), lastname: text(p.lastname), street: text(p.street),
    zip_code: text(p.zip_code), city: text(p.city), phone: text(p.phone), birthday: date(p.birthday),
    health_card_number: text(p.health_card_number), ss_provider_code: text(p.ss_provider_code),
    prescriptions: prescriptions(p.prescriptions, id),
    expire_soon_prescriptions: prescriptions(p.expire_soon_prescriptions, id)
  }
}
export const patientReadMessages = {
  missing: 'Patient introuvable.',
  network: 'Connexion réseau indisponible.',
  'rate-limit': 'Trop de demandes. Veuillez patienter avant de réessayer.',
  server: 'Service indisponible. Veuillez réessayer.',
  invalid: 'Dossier patient invalide.'
} as const
