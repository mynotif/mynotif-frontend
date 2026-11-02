import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import LoginForm from './LoginForm'
import { TokenContextProvider } from '../../context/token'
import { clearSession } from '../../services/session'
jest.mock('axios')
jest.mock('../module/Spinner', () => ({ Spinner: () => null }))
jest.mock('../../hook/TranslationHook', () => () => ({ t: (key: string) => key }))
jest.mock('@fortawesome/react-fontawesome', () => ({ FontAwesomeIcon: () => null }))
const http = axios as jest.Mocked<typeof axios>
afterEach(() => clearSession())
it('preserves anonymous form during pending login, blocks duplicate requests and displays refusal', async () => {
  clearSession()
  http.isAxiosError.mockImplementation((e: any) => e?.isAxiosError === true)
  let reject!: (error: unknown) => void
  http.post.mockReturnValueOnce(new Promise((_resolve, no) => { reject = no }))
  const { container } = render(<MemoryRouter><TokenContextProvider><LoginForm /></TokenContextProvider></MemoryRouter>)
  const email = screen.getByPlaceholderText('form.emailAddress')
  const password = screen.getByPlaceholderText('form.password')
  fireEvent.change(email, { target: { value: 'a@example.test' } })
  fireEvent.change(password, { target: { value: 'fictitious-password' } })
  fireEvent.submit(container.querySelector('form')!)
  await waitFor(() => expect(http.post).toHaveBeenCalledTimes(1))
  expect(email).toHaveValue('a@example.test')
  expect(email).toBeDisabled()
  fireEvent.submit(container.querySelector('form')!)
  await act(async () => { await Promise.resolve() })
  expect(http.post).toHaveBeenCalledTimes(1)
  await act(async () => reject({ isAxiosError: true, response: { status: 401 } }))
  expect(screen.getAllByRole('alert').some(e => e.textContent?.includes('incorrect'))).toBe(true)
  expect(screen.getByPlaceholderText('form.emailAddress')).toHaveValue('a@example.test')
  expect(screen.getByPlaceholderText('form.emailAddress')).not.toBeDisabled()
})
