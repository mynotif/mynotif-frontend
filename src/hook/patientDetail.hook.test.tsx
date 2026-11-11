import { act, fireEvent, render, screen } from '@testing-library/react'
import { TokenContext } from '../context/token'
import { getPatient } from '../services/api'
import { SessionFailure } from '../services/session'
import { defaultPatient } from '../types'
import { usePatientDetail } from './patientDetail.hook'

jest.mock('../services/api', () => ({ getPatient: jest.fn() }))
const get = getPatient as jest.Mock
function Probe({ id }: { id: string }) {
  const result = usePatientDetail(id)
  return <><span role='status'>{result.status}</span><span>{result.patient?.firstname}</span><button onClick={result.retry}>Retry</button></>
}
function view(id = '1', token: string | null = 'synthetic-A') {
  return <TokenContext.Provider value={{ token, setToken: jest.fn() }}><Probe id={id} /></TokenContext.Provider>
}
function deferred() {
  let resolve!: (data: any) => void
  let reject!: (error: any) => void
  const promise = new Promise((yes, no) => { resolve = yes; reject = no })
  return { promise, resolve, reject }
}
beforeEach(() => get.mockReset())
test.each(['42abc', '0', '-1', '1.2', 'Infinity', '9007199254740992', ''])('rejects invalid route %s', id => {
  render(view(id))
  expect(screen.getByRole('status')).toHaveTextContent('invalid')
  expect(get).not.toHaveBeenCalled()
})
test.each([
  [new SessionFailure('server', 404), 'missing'],
  [new SessionFailure('network'), 'network'],
  [new SessionFailure('rate-limit', 429), 'rate-limit'],
  [new SessionFailure('server', 503), 'server']
])('distinguishes failures and supports retry %#', async (error, status) => {
  get.mockRejectedValueOnce(error).mockResolvedValueOnce({ ...defaultPatient, id: 1, firstname: 'Recovered' })
  render(view())
  expect(screen.getByRole('status')).toHaveTextContent('loading')
  await act(async () => {})
  expect(screen.getByRole('status')).toHaveTextContent(status as string)
  fireEvent.click(screen.getByText('Retry'))
  await act(async () => {})
  expect(screen.getByText('Recovered')).toBeInTheDocument()
})
test('hides a loaded route/account immediately, aborts and ignores stale completion even without transport cancellation', async () => {
  const late = deferred()
  get.mockResolvedValueOnce({ ...defaultPatient, id: 1, firstname: 'Patient A' }).mockReturnValueOnce(late.promise)
  const { rerender } = render(view())
  await act(async () => {})
  expect(screen.getByText('Patient A')).toBeInTheDocument()
  rerender(view('2'))
  expect(screen.queryByText('Patient A')).not.toBeInTheDocument()
  expect(get.mock.calls[0][2].aborted).toBe(true)
  const newest = deferred()
  get.mockReturnValueOnce(newest.promise)
  rerender(view('2', 'synthetic-B'))
  expect(get.mock.calls[1][2].aborted).toBe(true)
  await act(async () => newest.resolve({ ...defaultPatient, id: 2, firstname: 'Current B' }))
  await act(async () => late.resolve({ ...defaultPatient, id: 2, firstname: 'Stale A' }))
  expect(screen.getByText('Current B')).toBeInTheDocument()
  expect(screen.queryByText('Stale A')).not.toBeInTheDocument()
  rerender(view('2', null))
  expect(screen.queryByText('Current B')).not.toBeInTheDocument()
})
test('ignores late route success/error and aborts on unmount', async () => {
  const a = deferred(), b = deferred()
  get.mockReturnValueOnce(a.promise).mockReturnValueOnce(b.promise)
  const { rerender, unmount } = render(view())
  rerender(view('2'))
  await act(async () => a.resolve({ ...defaultPatient, id: 1, firstname: 'Old' }))
  expect(screen.queryByText('Old')).not.toBeInTheDocument()
  expect(screen.getByRole('status')).toHaveTextContent('loading')
  unmount()
  expect(get.mock.calls[1][2].aborted).toBe(true)
  await act(async () => b.reject(new SessionFailure('network')))
})
test.each(['route', 'account'])('does not revive a previous dossier on %s A → B → A', async change => {
  const b = deferred(), aNew = deferred()
  get.mockResolvedValueOnce({ ...defaultPatient, id: 1, firstname: 'Old A' })
    .mockReturnValueOnce(b.promise).mockReturnValueOnce(aNew.promise)
  const { rerender } = render(view())
  await screen.findByText('Old A')
  rerender(change === 'route' ? view('2') : view('1', 'synthetic-B'))
  expect(screen.queryByText('Old A')).not.toBeInTheDocument()
  rerender(view())
  expect(screen.queryByText('Old A')).not.toBeInTheDocument()
  expect(screen.getByRole('status')).toHaveTextContent('loading')
  expect(get.mock.calls[1][2].aborted).toBe(true)
  await act(async () => b.resolve({ ...defaultPatient, id: change === 'route' ? 2 : 1, firstname: 'Stale B' }))
  expect(screen.queryByText('Stale B')).not.toBeInTheDocument()
  await act(async () => aNew.resolve({ ...defaultPatient, id: 1, firstname: 'Fresh A' }))
  expect(screen.getByText('Fresh A')).toBeInTheDocument()
})
