import { act, renderHook, waitFor } from '@testing-library/react'
import { createTodoItem, getTodoList, removeTodoItem, updateTodoItem } from '../services/todo-service'
import useTodo from './useTodo'

jest.mock('../services/todo-service')

describe('useTodo', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getTodoList', () => {
    it('should fetch todo list correctly', async () => {
      const mockTodoList = [
        { id: 1, name: 'Todo 1' },
        { id: 2, name: 'Todo 2' },
      ]

      ;(getTodoList as jest.Mock).mockResolvedValue({ data: mockTodoList, totalPage: 1 })

      const { result } = renderHook(() => useTodo())

      await act(async () => {
        await result.current.refreshList()
      })

      await waitFor(() => expect(result.current.data).toEqual(mockTodoList))
      expect(result.current.isLoading).toEqual(false)
      expect(result.current.error).toBeNull()
      expect(getTodoList).toHaveBeenCalledTimes(1)
    })

    it('should handle error when fetching todo list', async () => {
      const mockError = new Error('Failed to fetch todo list')

      ;(getTodoList as jest.Mock).mockRejectedValue(mockError)

      const { result } = renderHook(() => useTodo())

      await act(async () => {
        await result.current.refreshList()
      })

      await waitFor(() => expect(result.current.error).toEqual(mockError))
      expect(result.current.data).toBeNull()
      expect(result.current.isLoading).toEqual(false)
      expect(getTodoList).toHaveBeenCalledTimes(1)
    })
  })

  describe('createTodoItem', () => {
    it('should create a new todo item correctly', async () => {
      const newTodoName = 'New Todo'

      ;(createTodoItem as jest.Mock).mockResolvedValue(newTodoName)

      const { result } = renderHook(() => useTodo())

      await act(async () => {
        await result.current.createTodo(newTodoName)
      })

      await waitFor(() => expect(result.current.isLoading).toEqual(false))
      expect(result.current.error).toBeNull()
      expect(createTodoItem).toHaveBeenCalledWith(newTodoName)
    })

    it('should handle error when creating a new todo item', async () => {
      const newTodoName = 'New Todo'
      const mockError = new Error('Failed to create todo item')

      ;(createTodoItem as jest.Mock).mockRejectedValue(mockError)

      const { result } = renderHook(() => useTodo())

      await act(async () => {
        await result.current.createTodo(newTodoName)
      })

      await waitFor(() => expect(result.current.error).toEqual(mockError))
      expect(result.current.isLoading).toEqual(false)
      expect(createTodoItem).toHaveBeenCalledWith(newTodoName)
    })
  })

  describe('updateTodoItem', () => {
    it('should update an existing item correctly', async () => {
      const mockTodoId = 1
      const newTodoName = 'New Todo'

      ;(updateTodoItem as jest.Mock).mockResolvedValue(newTodoName)

      const { result } = renderHook(() => useTodo())

      await act(async () => {
        await result.current.updateTodo(mockTodoId, newTodoName)
      })

      await waitFor(() => expect(result.current.isLoading).toEqual(false))
      expect(result.current.error).toBeNull()
      expect(updateTodoItem).toHaveBeenCalledWith(mockTodoId, newTodoName)
    })

    it('should handle error when updating existing todo item', async () => {
      const mockTodoId = 1
      const newTodoName = 'New Todo'
      const mockError = new Error('Failed to update existing item')

      ;(updateTodoItem as jest.Mock).mockRejectedValue(mockError)

      const { result } = renderHook(() => useTodo())

      await act(async () => {
        await result.current.updateTodo(mockTodoId, newTodoName)
      })

      await waitFor(() => expect(result.current.error).toEqual(mockError))
      expect(result.current.isLoading).toEqual(false)
      expect(updateTodoItem).toHaveBeenCalledWith(mockTodoId, newTodoName)
    })
  })

  describe('removeTodoItem', () => {
    it('should remove an existing item correctly', async () => {
      const mockTodoId = 1

      ;(removeTodoItem as jest.Mock).mockResolvedValue(true)

      const { result } = renderHook(() => useTodo())

      await act(async () => {
        await result.current.removeTodo(mockTodoId)
      })

      await waitFor(() => expect(result.current.isLoading).toEqual(false))
      expect(result.current.error).toBeNull()
      expect(removeTodoItem).toHaveBeenCalledWith(mockTodoId)
    })

    it('should handle error when removing existing todo item', async () => {
      const mockTodoId = 1
      const mockError = new Error('Failed to update existing item')

      ;(removeTodoItem as jest.Mock).mockRejectedValue(mockError)

      const { result } = renderHook(() => useTodo())

      await act(async () => {
        await result.current.removeTodo(mockTodoId)
      })

      await waitFor(() => expect(result.current.error).toEqual(mockError))
      expect(result.current.isLoading).toEqual(false)
      expect(removeTodoItem).toHaveBeenCalledWith(mockTodoId)
    })
  })
})
