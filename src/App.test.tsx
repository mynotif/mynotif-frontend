import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() }
  })
}))

test('renders the main page', () => {
  render(<App />)
  const linkElement = screen.getByText(/title.login/)
  expect(linkElement).toBeInTheDocument()
})
