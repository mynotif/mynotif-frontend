import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import PatientForm from './PatientForm'
import { TokenContext } from '../../context/token'
import { FlashMessageContext } from '../../context/flashmessage'
import { createPatient, updatePatient } from '../../services/api'
import { defaultPatient } from '../../types'

const mockNavigate = jest.fn()
const mockSuccess = jest.fn()
const mockError = jest.fn()
jest.mock('react-router-dom', () => ({ useNavigate: () => mockNavigate }))
jest.mock('../../services/api', () => ({ createPatient: jest.fn(), updatePatient: jest.fn() }))
jest.mock('../../hook/TranslationHook', () => () => ({ t: (key: string) => key }))
jest.mock('../module/Spinner', () => ({ Spinner: () => <span role='status'>Loading</span> }))
jest.mock('@fortawesome/react-fontawesome', () => ({ FontAwesomeIcon: () => null }))

const patient = { ...defaultPatient, id: 42, firstname: 'Camille', lastname: 'Fictif' }
const createMock = createPatient as jest.MockedFunction<typeof createPatient>
const updateMock = updatePatient as jest.MockedFunction<typeof updatePatient>

function mount(isEditForm: boolean, token: string | null = 'synthetic-token') {
  return render(
    <TokenContext.Provider value={{ token, setToken: jest.fn() }}>
      <FlashMessageContext.Provider value={{ addSuccessMessage: mockSuccess, addErrorMessage: mockError } as any}>
        <PatientForm patient={patient} isEditForm={isEditForm} />
      </FlashMessageContext.Provider>
    </TokenContext.Provider>
  )
}

beforeEach(() => jest.clearAllMocks())

describe.each([false, true])('patient save (edit=%s)', isEditForm => {
  const action = isEditForm ? updateMock : createMock
  const errorKey = isEditForm ? 'error.updatedPatient' : 'error.createdPatient'

  test('keeps entered fields on API refusal and allows a successful retry', async () => {
    action.mockRejectedValueOnce(new Error('synthetic refusal')).mockResolvedValueOnce(patient)
    const { container } = mount(isEditForm)
    fireEvent.change(screen.getByPlaceholderText('form.firstName'), { target: { value: 'Saisie conservée' } })
    fireEvent.click(screen.getByRole('button', { name: 'title.optionalInformation' }))
    fireEvent.change(screen.getByPlaceholderText('form.phone'), { target: { value: '0100000000' } })
    fireEvent.submit(container.querySelector('form')!)
    await waitFor(() => expect(screen.getByText(errorKey)).toHaveAttribute('role', 'alert'))
    expect(screen.getByPlaceholderText('form.phone')).toHaveValue('0100000000')
    expect(screen.getByPlaceholderText('form.firstName')).toHaveValue('Saisie conservée')
    expect(mockNavigate).not.toHaveBeenCalled()
    expect(mockSuccess).not.toHaveBeenCalled()
    expect(screen.getByRole('button', { name: 'navigation.validate' })).not.toBeDisabled()
    fireEvent.submit(container.querySelector('form')!)
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledTimes(1))
    expect(mockNavigate).toHaveBeenCalledWith(isEditForm ? '/patients/42' : '/patients')
    expect(mockSuccess).toHaveBeenCalledTimes(1)
    expect(action).toHaveBeenLastCalledWith('synthetic-token', expect.objectContaining({ firstname: 'Saisie conservée' }))
  })

  test('shows loading until completion and blocks repeated submit synchronously', async () => {
    let resolve!: (value: typeof patient) => void
    action.mockImplementationOnce(() => new Promise(done => { resolve = done }))
    const { container } = mount(isEditForm)
    act(() => {
      fireEvent.submit(container.querySelector('form')!)
      fireEvent.submit(container.querySelector('form')!)
    })
    expect(action).toHaveBeenCalledTimes(1)
    expect(container.querySelector('button[type="submit"]')).toBeDisabled()
    expect(screen.getByRole('status')).toHaveTextContent('Loading')
    expect(mockNavigate).not.toHaveBeenCalled()
    await act(async () => resolve(patient))
    expect(mockSuccess).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith(isEditForm ? '/patients/42' : '/patients')
    expect(container.querySelector('button[type="submit"]')).not.toBeDisabled()
  })

  test('handles a missing session without invoking mutations or losing input', async () => {
    const { container } = mount(isEditForm, null)
    fireEvent.submit(container.querySelector('form')!)
    await waitFor(() => expect(screen.getByText(errorKey)).toHaveAttribute('role', 'alert'))
    expect(createMock).not.toHaveBeenCalled()
    expect(updateMock).not.toHaveBeenCalled()
    expect(mockNavigate).not.toHaveBeenCalled()
    expect(mockSuccess).not.toHaveBeenCalled()
    expect(container.querySelector('button[type="submit"]')).not.toBeDisabled()
  })
})
