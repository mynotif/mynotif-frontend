import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import usePatients from './patient.hook'
import { usePatientManagement } from './patientManagement'
import { TokenContext } from '../context/token'
import { privateApi, SessionFailure } from '../services/session'

let mockSubscriptionActive = false

jest.mock('../services/session', () => ({ ...jest.requireActual('../services/session'), privateApi: { get: jest.fn() } }))
jest.mock('./subscription', () => ({ useSubscription: () => ({ subscription: { active: mockSubscriptionActive } }) }))
const get = privateApi.get as jest.Mock
const summary = (id: number) => ({ id, firstname: `Patient${id}`, lastname: 'Fictif', city: '', phone: '', birthday: null })
const page = (id: number) => ({ count: 1, page: 1, page_size: 20, next_page: null, previous_page: null, results: [summary(id)] })
function deferred() {
  let resolve!: (value: any) => void
  const promise = new Promise(done => { resolve = done })
  return { promise, resolve }
}
function Rows() {
  const { patients, patientsLoading, reloadPatients } = usePatients()
  return <>
    <output>{patientsLoading ? 'pending' : 'settled'}</output>
    {patients.map(patient => <p key={patient.id}>{patient.firstname}</p>)}
    <button onClick={() => { void reloadPatients() }}>Reload</button>
  </>
}
function Quota() {
  const { patientCount, canAddPatient } = usePatientManagement()
  return <><output data-testid='count'>{patientCount}</output><button disabled={!canAddPatient}>Create</button></>
}
function mount(children: JSX.Element, token: string | null = 'synthetic-A') {
  return render(<TokenContext.Provider value={{ token, setToken: jest.fn() }}>{children}</TokenContext.Provider>)
}
beforeEach(() => {
  get.mockReset()
  mockSubscriptionActive = false
})

test('L4: an older reload cannot replace a newer result when the transport ignores abort', async () => {
  const old = deferred()
  const fresh = deferred()
  get.mockReturnValueOnce(old.promise).mockReturnValueOnce(fresh.promise)
  mount(<Rows />)
  fireEvent.click(screen.getByRole('button', { name: 'Reload' }))
  await act(async () => fresh.resolve({ data: page(2) }))
  expect(screen.getByText('Patient2')).toBeInTheDocument()
  await act(async () => old.resolve({ data: page(1) }))
  expect(screen.queryByText('Patient1')).not.toBeInTheDocument()
  expect(screen.getByText('Patient2')).toBeInTheDocument()
})

test('L4: a token change clears old rows immediately and ignores a late account response', async () => {
  const late = deferred()
  get.mockResolvedValueOnce({ data: page(1) }).mockReturnValueOnce(late.promise).mockResolvedValueOnce({ data: page(3) })
  const view = mount(<Rows />)
  await screen.findByText('Patient1')
  fireEvent.click(screen.getByRole('button', { name: 'Reload' }))
  view.rerender(<TokenContext.Provider value={{ token: 'synthetic-B', setToken: jest.fn() }}><Rows /></TokenContext.Provider>)
  expect(screen.queryByText('Patient1')).not.toBeInTheDocument()
  await screen.findByText('Patient3')
  await act(async () => late.resolve({ data: page(2) }))
  expect(screen.queryByText('Patient2')).not.toBeInTheDocument()
  expect(screen.getByText('Patient3')).toBeInTheDocument()
})

test('L4: unmount aborts the active read and tolerates its late completion', async () => {
  const pending = deferred()
  get.mockReturnValue(pending.promise)
  const view = mount(<Rows />)
  const signal = get.mock.calls[0][1].signal
  expect(signal).toBeDefined()
  expect(signal.aborted).toBe(false)
  view.unmount()
  expect(signal.aborted).toBe(true)
  await act(async () => pending.resolve({ data: page(1) }))
})

test('L5: quota uses the unfiltered count rather than the one-row page length', async () => {
  get.mockImplementation(async (url: string, config: any) => {
    const parsed = new URL(url, 'http://synthetic.invalid')
    const size = Number(config?.params?.page_size ?? parsed.searchParams.get('page_size') ?? 20)
    return { data: { count: 17, page: 1, page_size: size, next_page: size < 17 ? 2 : null,
      previous_page: null, results: Array.from({ length: Math.min(size, 17) }, (_, i) => summary(i + 1)) } }
  })
  mount(<Quota />)
  await waitFor(() => expect(screen.getByTestId('count')).toHaveTextContent('17'))
  expect(screen.getByRole('button', { name: 'Create' })).toBeDisabled()
})

test('L5: unknown quota fails closed while loading and after a count failure', async () => {
  const pending = deferred()
  get.mockReturnValue(pending.promise)
  mount(<Quota />)
  expect(screen.getByRole('button', { name: 'Create' })).toBeDisabled()
  await act(async () => pending.resolve({ data: { invalid: true } }))
  expect(screen.getByRole('button', { name: 'Create' })).toBeDisabled()
  expect(screen.getByTestId('count').textContent).not.toBe('0')
})

function SubscribedQuota() {
  const { canAddPatient, countLoading, countError } = usePatientManagement()
  return <>
    <output>{countLoading ? 'Count pending' : countError ? 'Count failed' : 'Count ready'}</output>
    <button disabled={!canAddPatient}>Create</button>
  </>
}

test('L5: an active subscription permits creation while the advisory count is pending', () => {
  mockSubscriptionActive = true
  get.mockReturnValue(deferred().promise)
  mount(<SubscribedQuota />)
  expect(screen.getByText('Count pending')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Create' })).not.toBeDisabled()
})

test('L5: an active subscription permits creation after an unavailable count', async () => {
  mockSubscriptionActive = true
  get.mockRejectedValue(new SessionFailure('server', 503))
  mount(<SubscribedQuota />)
  await screen.findByText('Count failed')
  expect(screen.getByRole('button', { name: 'Create' })).not.toBeDisabled()
})
