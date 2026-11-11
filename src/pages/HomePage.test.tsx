import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import HomePage from './HomePage'
import { TokenContext } from '../context/token'
import { privateApi, SessionFailure } from '../services/session'
import { defaultPrescription } from '../types'

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({ useNavigate: () => mockNavigate }))
jest.mock('../services/session', () => ({ ...jest.requireActual('../services/session'), privateApi: { get: jest.fn() } }))
jest.mock('i18next', () => ({ t: (key: string) => key }))
jest.mock('../hook/TranslationHook', () => () => ({ t: (key: string) => key }))
jest.mock('@fortawesome/react-fontawesome', () => ({ FontAwesomeIcon: () => null }))
const get = privateApi.get as jest.Mock
let count = 121
let prescriptions: any[] = []
let unavailable = false
const reads: Array<{ path: string; size: number }> = []

beforeEach(() => {
  jest.clearAllMocks()
  count = 121
  unavailable = false
  prescriptions = []
  reads.length = 0
  get.mockImplementation(async (url: string, config: any) => {
    const parsed = new URL(url, 'http://synthetic.invalid')
    const size = Number(config?.params?.page_size ?? parsed.searchParams.get('page_size') ?? 20)
    reads.push({ path: parsed.pathname, size })
    if (parsed.pathname === '/api/v1/prescription/') return { data: prescriptions }
    if (parsed.pathname !== '/api/v2/patients/') throw new Error('Unexpected synthetic endpoint')
    if (unavailable) throw new SessionFailure('server', 503)
    return { data: { count, page: 1, page_size: size, next_page: count > size ? 2 : null,
      previous_page: null, results: Array.from({ length: Math.min(count, size) }, (_, index) => ({
        id: index + 1, firstname: 'Premier', lastname: `Fictif${index + 1}`, city: '', phone: '', birthday: null
      })) } }
  })
})
function mount() {
  return render(<TokenContext.Provider value={{ token: 'synthetic-token', setToken: jest.fn() }}><HomePage /></TokenContext.Provider>)
}

test('L5: Home displays the exact total using a bounded count read rather than a page length', async () => {
  mount()
  const stats = await screen.findByRole('button', { name: /patients.*121/i })
  expect(stats).toHaveTextContent('121')
  expect(reads.filter(read => read.path === '/api/v2/patients/')).toEqual([{ path: '/api/v2/patients/', size: 1 }])
  expect(screen.queryByText('Bienvenue sur OrdoPro')).not.toBeInTheDocument()
})

test('L5: an expiring prescription for a patient outside the first page remains visible and navigable', async () => {
  const end = new Date()
  end.setDate(end.getDate() + 3)
  prescriptions = [{ ...defaultPrescription, id: 77, patient: 121, expiring_soon: true,
    patient_firstname: 'Élodie', patient_lastname: 'Tardive', end_date: end.toISOString().slice(0, 10) }]
  mount()
  await screen.findByText('Élodie Tardive')
  expect(screen.getByRole('button', { name: /patients.*121/i })).toBeInTheDocument()
  const line = screen.getByText('Élodie Tardive').closest('.flex.justify-between')!
  const action = line.querySelector('button')!
  expect(action).not.toBeNull()
  fireEvent.click(action)
  expect(mockNavigate).toHaveBeenCalledWith('/prescriptions/77/', expect.anything())
})

test('L5: unknown total never renders first-time onboarding or a misleading zero and can be retried', async () => {
  unavailable = true
  mount()
  await screen.findByRole('alert')
  expect(screen.queryByText('Bienvenue sur OrdoPro')).not.toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /patients.*0\b/i })).not.toBeInTheDocument()
  unavailable = false
  fireEvent.click(screen.getByRole('button', { name: /réessayer|reessayer|retry|refresh/i }))
  await screen.findByRole('button', { name: /patients.*121/i })
})

test('L5: first-time onboarding appears only after a confirmed zero count and zero prescriptions', async () => {
  count = 0
  mount()
  await waitFor(() => expect(screen.getByText('Bienvenue sur OrdoPro')).toBeInTheDocument())
})
