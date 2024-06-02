import axios from 'axios'
import { completeTodoItem, createTodoItem, getTodoList, removeTodoItem, updateTodoItem } from './todo-service'

jest.mock('axios')
describe('todo-service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getTodoList', () => {
    it('should return todo list with correct data structure', async () => {
      const mockName = 'New Todo Item'
      const mockId = 1
      ;(axios.get as jest.Mock).mockImplementation(() => {
        return {
          data: {
            status: 'success',
            data: {
              todoList: [
                {
                  id: mockId,
                  name: mockName,
                },
              ],
              totalPages: 1,
            },
          },
        }
      })
      const result = await getTodoList(1)
      expect(result).toEqual({ data: [{ id: mockId, name: mockName }], totalPages: 1 })
    })
  })

  describe('createTodoItem', () => {
    it('should create a new todo item', async () => {
      const mockName = 'New Todo Item'
      const mockResponse = {
        status: 'success',
      }

      ;(axios.post as jest.Mock).mockResolvedValueOnce({ data: mockResponse })

      await createTodoItem(mockName)

      expect(axios.post).toHaveBeenCalledTimes(1)
    })

    it('should throw an error if the API call fails', async () => {
      const mockName = 'New Todo Item'
      const mockError = new Error('Failed to create todo item')

      ;(axios.post as jest.Mock).mockRejectedValueOnce(mockError)

      await expect(createTodoItem(mockName)).rejects.toThrow(mockError)
      expect(axios.post).toHaveBeenCalledTimes(1)
    })
  })

  describe('updateTodoItem', () => {
    it('should update an existing todo item', async () => {
      const mockName = 'New Todo Item'
      const mockId = 1
      const mockResponse = {
        status: 'success',
      }

      ;(axios.patch as jest.Mock).mockResolvedValueOnce({ data: mockResponse })

      await updateTodoItem(mockId, mockName)

      // Assert
      expect(axios.patch).toHaveBeenCalledTimes(1)
    })

    it('should throw an error if the API call fails', async () => {
      const mockName = 'New Todo Item'
      const mockId = 1
      const mockError = new Error('Failed to create todo item')

      ;(axios.patch as jest.Mock).mockRejectedValueOnce(mockError)

      await expect(updateTodoItem(mockId, mockName)).rejects.toThrow(mockError)
      expect(axios.patch).toHaveBeenCalledTimes(1)
    })
  })

  describe('completeTodoItem', () => {
    it('should complete an existing todo item', async () => {
      const mockId = 1
      const mockResponse = {
        status: 'success',
      }

      ;(axios.patch as jest.Mock).mockResolvedValueOnce({ data: mockResponse })

      await completeTodoItem(mockId)

      // Assert
      expect(axios.patch).toHaveBeenCalledTimes(1)
    })

    it('should throw an error if the API call fails', async () => {
      const mockId = 1
      const mockError = new Error('Failed to complete todo item')

      ;(axios.patch as jest.Mock).mockRejectedValueOnce(mockError)

      await expect(completeTodoItem(mockId)).rejects.toThrow(mockError)
      expect(axios.patch).toHaveBeenCalledTimes(1)
    })
  })

  describe('removeTodoItem', () => {
    it('should remove an existing todo item', async () => {
      const mockId = 1
      const mockResponse = {
        status: 'success',
      }

      ;(axios.delete as jest.Mock).mockResolvedValueOnce({ data: mockResponse })

      await removeTodoItem(mockId)

      // Assert
      expect(axios.delete).toHaveBeenCalledTimes(1)
    })

    it('should throw an error if the API call fails', async () => {
      const mockId = 1
      const mockError = new Error('Failed to remove todo item')

      ;(axios.delete as jest.Mock).mockRejectedValueOnce(mockError)

      await expect(removeTodoItem(mockId)).rejects.toThrow(mockError)
      expect(axios.delete).toHaveBeenCalledTimes(1)
    })
  })
})
