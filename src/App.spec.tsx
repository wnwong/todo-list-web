import { render, screen } from '@testing-library/react'
import App from './App'
import useModal from './hooks/useModal'

jest.mock('./hooks/useModal')

describe('App', () => {
  beforeEach(() => {
    ;(useModal as jest.Mock).mockReturnValue({
      isModalOpen: false,
      setIsModalOpen: jest.fn(),
      modalConetnt: null,
      setModalConetnt: jest.fn(),
      modalTitle: '',
      setModalTitle: jest.fn(),
    })
  })

  it('renders the header', () => {
    render(<App />)
    expect(screen.getByTestId('app-header')).toBeInTheDocument()
  })

  it('renders the TodoList component', () => {
    render(<App />)
    expect(screen.getByTestId('todo-list')).toBeInTheDocument()
  })
})
