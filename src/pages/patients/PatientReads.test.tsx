import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import PatientDetail from './PatientDetail'
import PatientEdit from './PatientEdit'
import PrescriptionDetail from '../prescriptions/PrescriptionDetail'
import { TokenContext } from '../../context/token'
import { FlashMessageContext } from '../../context/flashmessage'
import { getPatient, getPrescription, updatePatient } from '../../services/api'
import { SessionFailure } from '../../services/session'
import { defaultPatient, defaultPrescription } from '../../types'

let mockId = '1'
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({ useParams: () => ({ id: mockId }), useNavigate: () => mockNavigate }))
jest.mock('../../services/api', () => ({ getPatient: jest.fn(), getPrescription: jest.fn(), updatePatient: jest.fn(), createPatient: jest.fn() }))
jest.mock('../../hook/TranslationHook', () => () => ({ t: (key: string) => key }))
jest.mock('i18next', () => ({ t: (key: string) => key }))
jest.mock('../../components/module/Spinner', () => ({ Spinner: () => <span>Loading</span> }))
jest.mock('@fortawesome/react-fontawesome', () => ({ FontAwesomeIcon: () => null }))
jest.mock('../../components/prescriptions/PrescriptionInfo', () => ({ PrescriptionInfo: () => null }))
jest.mock('../../components/prescriptions/ContactDoctor', () => ({ ContactDoctor: () => null }))
const get = getPatient as jest.Mock
const patient = { ...defaultPatient, id: 1, firstname: 'Camille', lastname: 'Fictif' }
function view(Page: () => JSX.Element, token = 'synthetic-A') {
  return <TokenContext.Provider value={{ token, setToken: jest.fn() }}><FlashMessageContext.Provider value={{ addErrorMessage: jest.fn(), addSuccessMessage: jest.fn() } as any}><Page /></FlashMessageContext.Provider></TokenContext.Provider>
}
beforeEach(() => { jest.clearAllMocks(); get.mockReset(); mockId = '1' })
test.each([PatientDetail, PatientEdit])('renders distinct read failures and accessible retry for %p', async Page => {
  for (const [failure, message] of [
    [new SessionFailure('server', 404), /introuvable/i],
    [new SessionFailure('network'), /réseau/i],
    [new SessionFailure('rate-limit', 429), /trop de/i],
    [new SessionFailure('server', 503), /service indisponible/i]
  ] as const) {
    get.mockRejectedValueOnce(failure).mockResolvedValueOnce(patient)
    const { unmount } = render(view(Page))
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(await screen.findByRole('alert')).toHaveTextContent(message)
    fireEvent.click(screen.getByRole('button', { name: /réessayer/i }))
    await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument())
    unmount()
  }
})
test('handles nullable legacy prescription dates and preserves every category/action', async () => {
  const legacy = { id: 11, patient: 1, prescribing_doctor: 'Sans date', end_date: null, start_date: null, email_doctor: null, photo_prescription: '', is_valid: false, expiring_soon: false }
  get.mockResolvedValue({ ...patient, prescriptions: [legacy, { ...legacy, id: 12, prescribing_doctor: 'Valide', end_date: '2030-01-01', is_valid: true }, { ...legacy, id: 13, prescribing_doctor: 'Bientôt', end_date: '2030-02-01', is_valid: true, expiring_soon: true }] })
  render(view(PatientDetail))
  expect(await screen.findByText('Camille Fictif')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: /Sans date/i }))
  expect(mockNavigate).toHaveBeenCalledWith('/prescriptions/11')
  expect(screen.getByRole('button', { name: /Valide/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /Bientôt/i })).toBeInTheDocument()
})
test('remounts edit for new patient/account while preserving current input and save refusal', async () => {
  get.mockImplementation((_token: string, id: number) => Promise.resolve({ ...patient, id, firstname: id === 1 ? 'Camille' : 'Autre' }))
  ;(updatePatient as jest.Mock).mockRejectedValue(new Error('synthetic refusal'))
  const { container, rerender } = render(view(PatientEdit))
  await screen.findByDisplayValue('Camille')
  fireEvent.change(screen.getByPlaceholderText('form.firstName'), { target: { value: 'Saisie' } })
  fireEvent.submit(container.querySelector('form')!)
  await screen.findByRole('alert')
  rerender(view(PatientEdit))
  expect(screen.getByDisplayValue('Saisie')).toBeInTheDocument()
  expect(screen.getByRole('alert')).toHaveTextContent('error.updatedPatient')
  expect(get).toHaveBeenCalledTimes(1)
  mockId = '2'
  rerender(view(PatientEdit))
  expect(screen.queryByDisplayValue('Saisie')).not.toBeInTheDocument()
  await screen.findByDisplayValue('Autre')
  fireEvent.change(screen.getByPlaceholderText('form.firstName'), { target: { value: 'Compte A' } })
  rerender(view(PatientEdit, 'synthetic-B'))
  expect(screen.queryByDisplayValue('Compte A')).not.toBeInTheDocument()
  expect(await screen.findByDisplayValue('Autre')).toBeInTheDocument()
})
test('prescription consumer hides old patient during route and account changes and ignores delayed patient', async () => {
  let completeOld!: (value: any) => void
  ;(getPrescription as jest.Mock).mockImplementation((_token: string, id: number) => Promise.resolve({ ...defaultPrescription, id, patient: id }))
  get.mockResolvedValueOnce(patient).mockImplementationOnce(() => new Promise(resolve => { completeOld = resolve })).mockResolvedValueOnce({ ...patient, id: 2, firstname: 'Compte B' })
  const { rerender } = render(view(PrescriptionDetail))
  await screen.findByText(/Camille/)
  mockId = '2'
  rerender(view(PrescriptionDetail))
  expect(screen.queryByText(/Camille/)).not.toBeInTheDocument()
  await waitFor(() => expect(get).toHaveBeenCalledTimes(2))
  rerender(view(PrescriptionDetail, 'synthetic-B'))
  await screen.findByText(/Compte B/)
  await act(async () => completeOld({ ...patient, id: 2, firstname: 'Ancien compte' }))
  expect(screen.queryByText(/Ancien compte/)).not.toBeInTheDocument()
  expect(screen.getByText(/Compte B/)).toBeInTheDocument()
})
test.each(['route', 'account'])('prescription consumer requires fresh data on %s A → B → A', async change => {
  let complete!: (value: any) => void
  ;(getPrescription as jest.Mock).mockResolvedValueOnce({ ...defaultPrescription, id: 1, patient: 1 })
    .mockImplementationOnce(() => new Promise(resolve => { complete = resolve }))
    .mockResolvedValueOnce({ ...defaultPrescription, id: 1, patient: 1 })
  get.mockResolvedValueOnce(patient).mockResolvedValueOnce({ ...patient, firstname: 'Fresh A' })
  const { rerender } = render(view(PrescriptionDetail))
  await screen.findByText(/Camille/)
  if (change === 'route') mockId = '2'
  rerender(view(PrescriptionDetail, change === 'account' ? 'synthetic-B' : 'synthetic-A'))
  expect(screen.queryByText(/Camille/)).not.toBeInTheDocument()
  mockId = '1'
  rerender(view(PrescriptionDetail))
  expect(screen.queryByText(/Camille/)).not.toBeInTheDocument()
  await screen.findByText(/Fresh A/)
  await act(async () => complete({ ...defaultPrescription, id: change === 'route' ? 2 : 1, patient: 2 }))
  expect(get).toHaveBeenCalledTimes(2)
  expect(screen.getByText(/Fresh A/)).toBeInTheDocument()
})
