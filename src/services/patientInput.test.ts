import { createPatient, updatePatient } from './api'
import { API_V1 } from './constants'
import { privateApi } from './session'
import { Patient } from '../types'

jest.mock('./session', () => ({
  privateApi: { post: jest.fn(), patch: jest.fn() }
}))

const http = privateApi as jest.Mocked<typeof privateApi>
const token = 'synthetic-access'
const editable = {
  firstname: 'Camille',
  lastname: 'Fictif',
  street: '  Rue fictive  ',
  zip_code: '75000',
  city: 'Paris',
  phone: '0100000000',
  birthday: '1990-01-02',
  health_card_number: 'synthetic-card',
  ss_provider_code: 'synthetic-provider'
}
const patient: Patient = {
  ...editable,
  id: 42,
  prescriptions: [],
  expire_soon_prescriptions: []
}

beforeEach(() => { jest.resetAllMocks() })

describe.each([
  { method: 'POST', mutate: createPatient, request: http.post, url: `${API_V1}/patient/` },
  { method: 'PATCH', mutate: updatePatient, request: http.patch, url: `${API_V1}/patient/42/` }
])('$method patient input', ({ mutate, request, url }) => {
  it('sends exactly the nine editable fields and preserves the v1 response', async () => {
    const input = {
      ...patient,
      prescriptions: [{ id: 11, private_note: 'synthetic-only' }],
      expire_soon_prescriptions: [{ id: 12 }],
      unknown: 'excluded',
      search: 'excluded',
      page: 3,
      page_size: 20,
      count: 50,
      next_page: 4,
      previous_page: 2,
      results: [{ id: 99 }]
    }
    request.mockResolvedValueOnce({ data: patient })

    const response = await mutate(token, input as unknown as Patient)

    expect(request).toHaveBeenCalledTimes(1)
    expect(request).toHaveBeenCalledWith(url, editable, {
      headers: { Authorization: `Bearer ${token}` }
    })
    expect(response).toBe(patient)
  })

  it('keeps empty strings and null birthday without adding absent fields', async () => {
    const input = { id: 42, firstname: '', city: '', birthday: null, search: 'excluded' }
    request.mockResolvedValueOnce({ data: patient })

    await mutate(token, input as unknown as Patient)

    expect(request).toHaveBeenCalledWith(url, { firstname: '', city: '', birthday: null }, {
      headers: { Authorization: `Bearer ${token}` }
    })
  })

  it('copies the writable payload without changing the original patient', async () => {
    const input = Object.freeze({ ...patient })
    request.mockResolvedValueOnce({ data: patient })

    await mutate(token, input)

    const body = request.mock.calls[0][1]
    expect(body).toEqual(editable)
    expect(body).not.toBe(input)
    expect(input).toEqual(patient)
  })

  it('preserves request rejections for the existing save error flow', async () => {
    const error = new Error('synthetic refusal')
    request.mockRejectedValueOnce(error)

    await expect(mutate(token, patient)).rejects.toBe(error)
    expect(request).toHaveBeenCalledWith(url, editable, {
      headers: { Authorization: `Bearer ${token}` }
    })
  })
})
