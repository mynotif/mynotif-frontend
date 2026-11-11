import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import PatientsPage from './PatientsPage'
import PatientCreatePage from './PatientCreatePage'
import PrescriptionForm from '../../components/forms/PrescriptionForm'
import { TokenContext } from '../../context/token'
import { FlashMessageContext } from '../../context/flashmessage'
import { privateApi, SessionFailure } from '../../services/session'
import { defaultPatient, defaultPrescription } from '../../types'

const mockNavigate = jest.fn()
let mockSubscriptionActive = false
jest.mock('react-router-dom', () => ({ useNavigate: () => mockNavigate }))
jest.mock('../../services/session', () => ({ ...jest.requireActual('../../services/session'), privateApi: { get: jest.fn(), post: jest.fn() } }))
jest.mock('../../hook/subscription', () => ({ useSubscription: () => ({ subscription: { active: mockSubscriptionActive } }) }))
jest.mock('../../hook/TranslationHook', () => () => ({ t: (key: string) => key }))
jest.mock('i18next', () => ({ t: (key: string) => key }))
jest.mock('@fortawesome/react-fontawesome', () => ({ FontAwesomeIcon: () => null }))
const get = privateApi.get as jest.Mock
const post = privateApi.post as jest.Mock
const nextName = /suivant|next|plus|more/i
const retryName = /réessayer|reessayer|retry|recommencer|rafraîchir|refresh/i
const patients = Array.from({ length: 121 }, (_, i) => ({
  id: i + 1, firstname: `P${i + 1}`, lastname: 'Fictif',
  city: i === 120 ? 'Lyon' : 'Paris', phone: '', birthday: null
}))
type Read = { page: number; size: number; search: string }
const reads: Read[] = []

function read(url: string, config: any): Read {
  const parsed = new URL(url, 'http://synthetic.invalid')
  if (parsed.pathname !== '/api/v2/patients/') throw new Error(`Unexpected synthetic endpoint: ${parsed.pathname}`)
  const query = { ...Object.fromEntries(parsed.searchParams), ...config?.params }
  const request = { page: Number(query.page ?? 1), size: Number(query.page_size ?? 20), search: query.search ?? '' }
  reads.push(request)
  return request
}
function response(query: Read, rows = patients) {
  const filtered = rows.filter(row => `${row.firstname} ${row.lastname} ${row.city} ${row.phone}`.toLowerCase().includes(query.search.toLowerCase()))
  const last = Math.max(1, Math.ceil(filtered.length / query.size))
  if (query.page > last) return Promise.reject(new SessionFailure('server', 404))
  return Promise.resolve({ data: {
    count: filtered.length, page: query.page, page_size: query.size,
    next_page: query.page < last ? query.page + 1 : null,
    previous_page: query.page > 1 ? query.page - 1 : null,
    results: filtered.slice((query.page - 1) * query.size, query.page * query.size)
  } })
}
function deferred() {
  let resolve!: (value: any) => void
  const promise = new Promise(done => { resolve = done })
  return { promise, resolve }
}
function mount(form = false) {
  return render(<TokenContext.Provider value={{ token: 'synthetic-A', setToken: jest.fn() }}>
    <FlashMessageContext.Provider value={{ addSuccessMessage: jest.fn(), addErrorMessage: jest.fn() } as any}>
      {form ? <PrescriptionForm prescription={defaultPrescription} isEditForm={false} /> : <PatientsPage />}
    </FlashMessageContext.Provider>
  </TokenContext.Provider>)
}
const patientName = (id: number) => new RegExp(`Fictif P${id}$`, 'i')
async function goNext() {
  const button = screen.getByRole('button', { name: nextName })
  expect(button).not.toBeDisabled()
  fireEvent.click(button)
}
beforeEach(() => {
  jest.clearAllMocks()
  mockSubscriptionActive = false
  reads.length = 0
  get.mockImplementation((url, config) => response(read(url, config)))
})

test('L2/L5: every patient among more than 100 is reachable across server pages without duplicate whole-list loads', async () => {
  mount()
  await screen.findByText(patientName(1))
  expect(reads.filter(item => item.search === '' && item.size !== 1)).toHaveLength(1)
  const reached = new Set<number>()
  for (let traversal = 0; traversal < 121; traversal++) {
    screen.getAllByRole('heading').forEach(heading => {
      const id = heading.textContent?.match(/Fictif P(\d+)/i)?.[1]
      if (id) reached.add(Number(id))
    })
    if (reached.has(121)) break
    const before = reads.filter(item => item.size !== 1).length
    await goNext()
    await waitFor(() => expect(reads.filter(item => item.size !== 1).length).toBeGreaterThan(before))
    const latest = reads.filter(item => item.size !== 1).slice(-1)[0]
    await screen.findByText(patientName(Math.min(latest.page * latest.size, 121)))
  }
  expect(reached.size).toBe(121)
  expect(new Set(reads.filter(item => item.size !== 1).map(item => item.page)).size).toBeGreaterThanOrEqual(3)
  const next = screen.queryByRole('button', { name: nextName })
  expect(next === null || (next as HTMLButtonElement).disabled).toBe(true)
})

test('L1/L5: global city search finds a later patient and does not replace the total quota with filtered count', async () => {
  mount()
  await screen.findByText(patientName(1))
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Lyon' } })
  await screen.findByText(patientName(121))
  expect(reads.some(item => item.search === 'Lyon' && item.page === 1)).toBe(true)
  expect(screen.getByText(/Nombre total de patients.*121/)).toBeInTheDocument()
  expect(screen.queryByText(patientName(1))).not.toBeInTheDocument()
})

test('L2/L3: zero count and no search matches are explicit empty states', async () => {
  get.mockImplementation((url, config) => response(read(url, config), []))
  mount()
  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/aucun|vide|empty|no.*patient/i))
  expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Introuvable' } })
  await waitFor(() => expect(reads.some(item => item.search === 'Introuvable')).toBe(true))
  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/recherch|search|résultat|result/i))
})

test.each([
  ['network', new SessionFailure('network'), /réseau|network|offline|connexion/i],
  ['rate limit', new SessionFailure('rate-limit', 429), /429|trop|rate|limit|requêtes/i],
  ['unavailable', new SessionFailure('server', 503), /503|indispon|unavailable|service|server/i]
])('L3: initial %s failure is visible and retry recovers', async (_label, failure, message) => {
  let failed = true
  get.mockImplementation((url, config) => {
    const query = read(url, config)
    return failed ? Promise.reject(failure) : response(query)
  })
  mount()
  await waitFor(() => expect(screen.getAllByRole('alert').some(alert => message.test(alert.textContent ?? ''))).toBe(true))
  expect(screen.queryByText(/aucun patient|noPatients/i)).not.toBeInTheDocument()
  failed = false
  fireEvent.click(screen.getAllByRole('button', { name: retryName })[0])
  await screen.findByText(patientName(1))
})

test.each([
  ['network', new SessionFailure('network')], ['429', new SessionFailure('rate-limit', 429)],
  ['503', new SessionFailure('server', 503)]
])('L3: later-page %s failure is not silent truncation and retry keeps page and search', async (_label, failure) => {
  let failed = true
  get.mockImplementation((url, config) => {
    const query = read(url, config)
    return query.page === 2 && failed ? Promise.reject(failure) : response(query)
  })
  mount()
  await screen.findByText(patientName(1))
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Fictif' } })
  await waitFor(() => expect(reads.some(item => item.search === 'Fictif')).toBe(true))
  await goNext()
  await screen.findByRole('alert')
  expect(screen.queryByText(/aucun patient|noPatients/i)).not.toBeInTheDocument()
  failed = false
  fireEvent.click(screen.getByRole('button', { name: retryName }))
  await waitFor(() => expect(reads.filter(item => item.page === 2 && item.search === 'Fictif')).toHaveLength(2))
  const requested = reads.filter(item => item.page === 2).slice(-1)[0]
  await screen.findByText(patientName(requested.size + 1))
})

test('L2: a page removed by concurrent shrink provides reachable recovery', async () => {
  let shrinking = false
  get.mockImplementation((url, config) => {
    const query = read(url, config)
    if (query.page > 1) shrinking = true
    return response(query, shrinking ? patients.slice(0, 1) : patients)
  })
  mount()
  await screen.findByText(patientName(1))
  const initialReads = reads.filter(item => item.page === 1 && item.size !== 1).length
  await goNext()
  await waitFor(() => {
    expect(reads.some(item => item.page === 2)).toBe(true)
    const recovery = screen.queryByRole('button', { name: /précédent|previous|première|first|recommencer|restart|retry|réessayer/i })
    expect(reads.filter(item => item.page === 1 && item.size !== 1).length > initialReads || recovery !== null).toBe(true)
  })
  if (reads.filter(item => item.page === 1 && item.size !== 1).length === initialReads) {
    fireEvent.click(screen.getByRole('button', { name: /précédent|previous|première|first|recommencer|restart|retry|réessayer/i }))
  }
  await waitFor(() => expect(reads.filter(item => item.page === 1 && item.size !== 1).length).toBeGreaterThan(initialReads))
  await screen.findByText(patientName(1))
})

test('L2: a patient repeated across page boundaries is never rendered twice', async () => {
  get.mockImplementation(async (url, config) => {
    const query = read(url, config)
    const result = await response(query)
    if (query.page === 2) result.data.results[0] = patients[query.size - 1]
    return result
  })
  mount()
  await screen.findByText(patientName(1))
  const size = reads.find(item => item.size !== 1)!.size
  await goNext()
  await screen.findByText(patientName(size + 2))
  expect(screen.getAllByText(patientName(size))).toHaveLength(1)
})

test('L4: a late search response cannot replace the current search even if abort is ignored', async () => {
  const old = deferred()
  get.mockImplementation((url, config) => {
    const query = read(url, config)
    return query.search === 'Paris' ? old.promise : response(query)
  })
  mount()
  await screen.findByText(patientName(1))
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Paris' } })
  await waitFor(() => expect(reads.some(item => item.search === 'Paris')).toBe(true))
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Lyon' } })
  await screen.findByText(patientName(121))
  await act(async () => old.resolve(await response({ page: 1, size: 20, search: 'Paris' })))
  expect(screen.getByText(patientName(121))).toBeInTheDocument()
  expect(screen.queryByText(patientName(1))).not.toBeInTheDocument()
})

test('L4: a late old page cannot replace a newer search', async () => {
  const old = deferred()
  get.mockImplementation((url, config) => {
    const query = read(url, config)
    return query.page === 2 ? old.promise : response(query)
  })
  mount()
  await screen.findByText(patientName(1))
  await goNext()
  await waitFor(() => expect(reads.some(item => item.page === 2)).toBe(true))
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Lyon' } })
  await screen.findByText(patientName(121))
  const query = reads.find(item => item.page === 2)!
  await act(async () => old.resolve(await response(query)))
  expect(screen.getByText(patientName(121))).toBeInTheDocument()
  expect(screen.queryByText(patientName(query.size + 1))).not.toBeInTheDocument()
})

test('L5: selector reaches later pages and keeps an off-page selected option after a search change', async () => {
  mount(true)
  await screen.findByRole('option', { name: patientName(1) })
  while (!screen.queryByRole('option', { name: patientName(121) })) {
    await goNext()
    const query = reads.slice(-1)[0]
    await screen.findByRole('option', { name: patientName(Math.min(query.page * query.size, 121)) })
  }
  fireEvent.change(screen.getByRole('combobox'), { target: { value: '121' } })
  fireEvent.change(screen.getByPlaceholderText(/search|recherch/i), { target: { value: 'Paris' } })
  await waitFor(() => expect(reads.some(item => item.search === 'Paris' && item.page === 1)).toBe(true))
  await act(async () => { await Promise.resolve() })
  expect(screen.getByRole('combobox')).toHaveValue('121')
  expect(screen.getByRole('option', { name: patientName(121) })).toBeInTheDocument()
  fireEvent.change(screen.getByPlaceholderText(/search|recherch/i), { target: { value: 'Lyon' } })
  await waitFor(() => expect(reads.some(item => item.search === 'Lyon')).toBe(true))
  await act(async () => { await Promise.resolve() })
  expect(screen.getByRole('combobox')).toHaveValue('121')
})

test('L5: a newly created patient stays selected when reload page one does not contain it', async () => {
  const created = { ...defaultPatient, id: 999, firstname: 'Nouveau', lastname: 'Fictif' }
  post.mockResolvedValue({ data: created })
  mount(true)
  await screen.findByRole('option', { name: patientName(1) })
  const before = reads.length
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'addNewPatient' } })
  fireEvent.change(screen.getByPlaceholderText('form.firstName'), { target: { value: 'Nouveau' } })
  fireEvent.change(screen.getByPlaceholderText('form.lastName'), { target: { value: 'Fictif' } })
  fireEvent.click(screen.getByRole('button', { name: 'navigation.add' }))
  await waitFor(() => expect(reads.length).toBeGreaterThan(before))
  await act(async () => { await Promise.resolve() })
  await waitFor(() => expect(screen.getByRole('combobox')).toHaveValue('999'))
  expect(screen.getByRole('option', { name: /Fictif Nouveau/i })).toBeInTheDocument()
})

test('L5: Enter in patient search cancels implicit prescription submission and never mutates', async () => {
  mount(true)
  await screen.findByRole('option', { name: patientName(1) })
  fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } })
  fireEvent.change(screen.getByPlaceholderText('form.doctor'), { target: { value: 'Médecin fictif' } })
  const search = screen.getByRole('textbox', { name: 'Rechercher un patient' })
  fireEvent.change(search, { target: { value: 'Fictif' } })
  await waitFor(() => expect(reads.some(item => item.search === 'Fictif')).toBe(true))
  const enter = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true, cancelable: true })
  expect(fireEvent(search, enter)).toBe(false)
  expect(enter.defaultPrevented).toBe(true)
  expect(post).not.toHaveBeenCalled()
})

test('L5/L6: an active subscriber keeps the patient creation form and inputs through count loading and failure', async () => {
  mockSubscriptionActive = true
  let refuseCount!: (error: Error) => void
  get.mockReturnValue(new Promise((_resolve, reject) => { refuseCount = reject }))
  render(<TokenContext.Provider value={{ token: 'synthetic-A', setToken: jest.fn() }}>
    <FlashMessageContext.Provider value={{ addSuccessMessage: jest.fn(), addErrorMessage: jest.fn() } as any}>
      <PatientCreatePage />
    </FlashMessageContext.Provider>
  </TokenContext.Provider>)
  const firstname = screen.getByPlaceholderText('form.firstName')
  fireEvent.change(firstname, { target: { value: 'Saisie conservée' } })
  await act(async () => refuseCount(new SessionFailure('server', 503)))
  expect(screen.getByPlaceholderText('form.firstName')).toBe(firstname)
  expect(firstname).toHaveValue('Saisie conservée')
  expect(screen.getByRole('button', { name: 'navigation.validate' })).not.toBeDisabled()
  expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  expect(screen.queryByText('subscription.limit_reached')).not.toBeInTheDocument()
  expect(post).not.toHaveBeenCalled()
})
