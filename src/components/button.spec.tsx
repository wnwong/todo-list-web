import { render, screen } from '@testing-library/react'
import Button from './button'

test('renders the button', () => {
  render(
    <Button>
      <div>{'testing'} </div>
    </Button>
  )
  const linkElement = screen.getByText(/testing/i)
  expect(linkElement).toBeInTheDocument()
})
