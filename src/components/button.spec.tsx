import { render, screen } from '@testing-library/react'
import Button from './button'

describe('button', () => {
  it('should render the button with default styles', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveStyle({
      textTransform: 'capitalize',
    })
  })

  it('should render the button with success styles', () => {
    render(<Button success>Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveStyle({
      textTransform: 'capitalize',
      color: 'green',
    })
  })

  it('should render children correctly', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Click me')

    const customElement = <span>Custom Element</span>
    render(<Button>{customElement}</Button>)
    expect(screen.getByText('Custom Element')).toBeInTheDocument()
  })
})
