import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import TodoList from './todo-list'
import useTodo from '../hooks/useTodo'

jest.mock('../hooks/useTodo')

describe('todo-list', () => {
  const mockTodoData = [
    { id: 1, name: 'Todo 1' },
    { id: 2, name: 'Todo 2' },
    { id: 3, name: 'Todo 3' },
  ]

  const mockHandlers = {
    modalhandler: jest.fn(),
    modalContentHandler: jest.fn(),
  }

  beforeEach(() => {
    ;(useTodo as jest.Mock).mockReturnValue({
      data: mockTodoData,
      refreshList: jest.fn(),
      createTodo: jest.fn(),
      completeTodo: jest.fn(),
      updateTodo: jest.fn(),
      removeTodo: jest.fn(),
      page: 1,
      totalPages: 1,
    })
  })

  it('renders the list of todos', () => {
    render(<TodoList {...mockHandlers} />)

    mockTodoData.forEach((todo) => {
      expect(screen.getByText(todo.name)).toBeInTheDocument()
    })
  })

  it('open the create todo modal when "create" button is clicked', () => {
    render(<TodoList {...mockHandlers} />)
    fireEvent.click(screen.getByText('create'))

    expect(mockHandlers.modalContentHandler).toHaveBeenCalledWith('Create New Todo', expect.anything())
    expect(mockHandlers.modalhandler).toHaveBeenCalledWith(true)
  })

  it('open the edit todo modal when "edit" button is clicked', () => {
    render(<TodoList {...mockHandlers} />)
    fireEvent.click(screen.getByTestId(`edit-button-1`))

    expect(mockHandlers.modalContentHandler).toHaveBeenCalledWith('Edit Todo', expect.anything())
    expect(mockHandlers.modalhandler).toHaveBeenCalledWith(true)
  })

  it('calls the removeTodo function when the "delete" button is clicked', async () => {
    render(<TodoList {...mockHandlers} />)

    fireEvent.click(screen.getByTestId('delete-button-1'))
    fireEvent.click(screen.getByTestId('delete-confirm-1'))

    await waitFor(() => {
      expect(useTodo().removeTodo).toHaveBeenCalledWith(1)
    })
  })

  it('calls the completeTodo function when the "complete" button is clicked', async () => {
    render(<TodoList {...mockHandlers} />)

    fireEvent.click(screen.getByTestId('complete-button-1'))
    fireEvent.click(screen.getByTestId('complete-confirm-1'))

    await waitFor(() => {
      expect(useTodo().completeTodo).toHaveBeenCalledWith(1)
    })
  })
})
