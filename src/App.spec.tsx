import { render, screen } from '@testing-library/react'
import App from './App'

describe('App.tsx', () => {
  test('renders the main page', () => {
    render(<App />)
    const linkElement = screen.getByText(/create/i)
    expect(linkElement).toBeInTheDocument()
  })
})
