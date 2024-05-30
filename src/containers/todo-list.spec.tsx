import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import TodoList from './todo-list'
import { useTodo } from '../hooks/useTodo'

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
      updateTodo: jest.fn(),
      removeTodo: jest.fn(),
    })
  })

  test('renders the list of todos', () => {
    render(<TodoList {...mockHandlers} />)

    mockTodoData.forEach((todo) => {
      expect(screen.getByText(todo.name)).toBeInTheDocument()
    })
  })

  test('calls the create button handler', () => {
    render(<TodoList {...mockHandlers} />)
    fireEvent.click(screen.getByText('create'))

    expect(mockHandlers.modalContentHandler).toHaveBeenCalledWith('Create New Todo', expect.anything())
    expect(mockHandlers.modalhandler).toHaveBeenCalledWith(true)
  })

  test('calls the edit button handler', () => {
    render(<TodoList {...mockHandlers} />)
    fireEvent.click(screen.getByTestId(`edit-button-${1}`))

    expect(mockHandlers.modalContentHandler).toHaveBeenCalledWith('Edit Todo', expect.anything())
    expect(mockHandlers.modalhandler).toHaveBeenCalledWith(true)
  })

  test('calls the delete button handler', async () => {
    render(<TodoList {...mockHandlers} />)
    fireEvent.click(screen.getByTestId(`delete-button-${1}`))

    await waitFor(() => {
      expect((useTodo as jest.Mock)().removeTodo).toHaveBeenCalledWith(1)
    })
  })
})
