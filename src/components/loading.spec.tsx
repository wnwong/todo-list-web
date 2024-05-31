import { render, screen } from '@testing-library/react'
import Loading from './loading'

describe('loading', () => {
  it('should render the loading spinner and default message', () => {
    render(<Loading />)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should render the loading spinner and custom message', () => {
    const loadingMessage = 'Please wait a moment'
    render(<Loading message={loadingMessage} />)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
    expect(screen.getByText(loadingMessage)).toBeInTheDocument()
  })
})
