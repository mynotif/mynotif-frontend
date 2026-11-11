import { getPatientPage } from './patientList'
import { privateApi } from './session'

jest.mock('./session', () => ({ ...jest.requireActual('./session'), privateApi: { get: jest.fn() } }))
const get = privateApi.get as jest.Mock
const summary = { id: 1, firstname: 'Camille', lastname: 'Fictif', city: '', phone: '', birthday: null }
const page = (overrides: Record<string, unknown> = {}) => ({
  count: 1, page: 1, page_size: 20, next_page: null, previous_page: null,
  results: [summary], ...overrides
})

function requestedUrl(): URL {
  const [url, config] = get.mock.calls[0]
  const parsed = new URL(url, 'http://synthetic.invalid')
  Object.entries(config?.params ?? {}).forEach(([key, value]) => parsed.searchParams.set(key, String(value)))
  return parsed
}

beforeEach(() => get.mockReset())

test('L1: defaults to the v2 six-field summary endpoint and forwards the session and signal', async () => {
  const signal = new AbortController().signal
  get.mockResolvedValue({ data: page() })
  await expect(getPatientPage('synthetic-token', undefined, signal)).resolves.toEqual(page())
  expect(requestedUrl().pathname).toBe('/api/v2/patients/')
  expect(Object.fromEntries(requestedUrl().searchParams)).toEqual({ page: '1', page_size: '20', search: '' })
  expect(get.mock.calls[0][1]).toMatchObject({ headers: { Authorization: 'Bearer synthetic-token' }, signal })
})

test('L1: encodes a global Unicode search without changing its text', async () => {
  const search = 'Élodie + & / ? 😀'
  get.mockResolvedValue({ data: page({ page_size: 100 }) })
  await getPatientPage('synthetic-token', { page: 1, pageSize: 100, search })
  expect(requestedUrl().searchParams.get('search')).toBe(search)
  expect(requestedUrl().searchParams.get('page_size')).toBe('100')
})

test('L1: counts Unicode code points rather than UTF-16 units', async () => {
  get.mockResolvedValue({ data: page() })
  await expect(getPatientPage('synthetic-token', { search: '😀'.repeat(100) })).resolves.toEqual(page())
})

test.each([
  { page: 0 }, { page: -1 }, { page: 1.5 }, { page: 2147483648 }, { page: NaN },
  { pageSize: 0 }, { pageSize: 101 }, { pageSize: 1.5 }, { search: '😀'.repeat(101) }
])('L1: rejects invalid query before HTTP: %j', async query => {
  await expect(getPatientPage('synthetic-token', query)).rejects.toBeDefined()
  expect(get).not.toHaveBeenCalled()
})

test.each([
  ['array instead of envelope', []],
  ['unknown envelope field', page({ extra: true })],
  ['missing envelope field', { count: 0, page: 1, page_size: 20, next_page: null, results: [] }],
  ['negative count', page({ count: -1 })],
  ['unsafe count', page({ count: Number.MAX_SAFE_INTEGER + 1 })],
  ['fractional count', page({ count: 1.5 })],
  ['wrong page', page({ page: 2 })],
  ['wrong size', page({ page_size: 100 })],
  ['inconsistent next page', page({ next_page: 2 })],
  ['inconsistent previous page', page({ previous_page: 1 })],
  ['truncated results', page({ count: 2 })],
  ['non-array results', page({ results: {} })],
  ['dossier fields in summary', page({ results: [{ ...summary, street: 'private synthetic street' }] })],
  ['missing summary field', page({ results: [{ id: 1, firstname: 'C', lastname: 'F', city: '', phone: '' }] })],
  ['non-positive id', page({ results: [{ ...summary, id: 0 }] })],
  ['invalid string', page({ results: [{ ...summary, phone: null }] })],
  ['impossible birthday', page({ results: [{ ...summary, birthday: '2026-02-30' }] })]
])('L1: rejects malformed server data (%s)', async (_name, data) => {
  get.mockResolvedValue({ data })
  await expect(getPatientPage('synthetic-token')).rejects.toBeDefined()
})

test('L2: accepts zero patients and a partial final page with its exact filtered count', async () => {
  const empty = page({ count: 0, results: [] })
  const last = page({ count: 201, page: 3, page_size: 100, previous_page: 2, results: [{ ...summary, id: 201 }] })
  get.mockResolvedValueOnce({ data: empty }).mockResolvedValueOnce({ data: last })
  await expect(getPatientPage('synthetic-token')).resolves.toEqual(empty)
  await expect(getPatientPage('synthetic-token', { page: 3, pageSize: 100 })).resolves.toEqual(last)
})

test.each([404, 429, 503])('L3: preserves failure status %s for recovery instead of returning an empty page', async status => {
  const failure = { status, kind: 'unavailable' }
  get.mockRejectedValue(failure)
  await expect(getPatientPage('synthetic-token')).rejects.toMatchObject({ status })
})

test('L3: a network refusal never becomes a successful empty page', async () => {
  get.mockRejectedValue(new TypeError('synthetic offline'))
  await expect(getPatientPage('synthetic-token')).rejects.toBeDefined()
})
