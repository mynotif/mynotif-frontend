import { getPatient } from './api'
import { privateApi } from './session'
import { parsePatientDetail } from './patientDetail'
import { defaultPatient } from '../types'

jest.mock('./session', () => ({ privateApi: { get: jest.fn() } }))
const get = privateApi.get as jest.Mock
const prescription = {
  id: 9, prescribing_doctor: 'Fictif', email_doctor: null,
  start_date: null, end_date: null, photo_prescription: '',
  is_valid: false, patient: 42, expiring_soon: false
}
const dossier = { ...defaultPatient, id: 42, firstname: 'Camille', prescriptions: [prescription] }
beforeEach(() => get.mockReset())

test('reads the complete v1 dossier and forwards cancellation without adding list projection', async () => {
  get.mockResolvedValue({ data: dossier })
  const signal = new AbortController().signal
  const result = await getPatient('synthetic-token', 42, signal)
  expect(get).toHaveBeenCalledWith(expect.stringMatching(/\/patient\/42\/$/), {
    headers: { Authorization: 'Bearer synthetic-token' }, signal
  })
  expect(result).toEqual(dossier)
})
test('preserves nullable legacy prescription fields without requiring expanded patient names', () => {
  expect(parsePatientDetail(dossier, 42)).toEqual(dossier)
})
test('projects only dossier and legacy prescription fields', () => {
  const result = parsePatientDetail({ ...dossier, secret: 'omit', prescriptions: [{ ...prescription, extra: true }] }, 42)
  expect(result).toEqual(dossier)
})
test.each([0, -1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1])('rejects invalid request id %s before transport', async id => {
  await expect(getPatient('synthetic-token', id)).rejects.toThrow()
  expect(get).not.toHaveBeenCalled()
})
test.each([
  null, [], {}, { ...dossier, id: 41 }, { ...dossier, id: '42' },
  { ...dossier, firstname: null }, { ...dossier, birthday: 'bad-date' },
  { ...dossier, birthday: '2025-02-30' }, { ...dossier, prescriptions: null },
  { ...dossier, expire_soon_prescriptions: undefined },
  { ...dossier, prescriptions: [{ ...prescription, patient: 41 }] },
  { ...dossier, prescriptions: [{ ...prescription, is_valid: 'false' }] },
  { ...dossier, prescriptions: [{ ...prescription, end_date: {} }] }
])('rejects malformed or mismatched dossier %#', async data => {
  get.mockResolvedValue({ data })
  await expect(getPatient('synthetic-token', 42)).rejects.toThrow()
})
