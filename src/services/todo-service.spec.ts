import axios from 'axios'
import { createTodoItem, getTodoList, removeTodoItem, updateTodoItem } from './todo-service'

jest.mock('axios')
describe('todo-service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getTodoList', () => {
    it('should return todo list with correct data structure', async () => {
      const itemId = 1
      const itemName = 'talk to john'
      ;(axios.get as jest.Mock).mockImplementation(() => {
        return {
          data: {
            status: 'success',
            data: {
              todoList: [
                {
                  id: itemId,
                  name: itemName,
                },
              ],
              totalPages: 1,
            },
          },
        }
      })
      const result = await getTodoList(1)
      expect(result).toEqual({ data: [{ id: itemId, name: itemName }], totalPages: 1 })
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

      // Assert
      expect(axios.post).toHaveBeenCalledWith(`http://localhost:3001/api/v1/todos`, { name: mockName })
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

      ;(axios.put as jest.Mock).mockResolvedValueOnce({ data: mockResponse })

      await updateTodoItem(mockId, mockName)

      // Assert
      expect(axios.put).toHaveBeenCalledTimes(1)
    })

    it('should throw an error if the API call fails', async () => {
      const mockName = 'New Todo Item'
      const mockId = 1
      const mockError = new Error('Failed to create todo item')

      ;(axios.put as jest.Mock).mockRejectedValueOnce(mockError)

      await expect(updateTodoItem(mockId, mockName)).rejects.toThrow(mockError)
      expect(axios.put).toHaveBeenCalledTimes(1)
    })
  })

  describe('removeTodoItem', () => {
    it('should update an existing todo item', async () => {
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
      const mockError = new Error('Failed to create todo item')

      ;(axios.delete as jest.Mock).mockRejectedValueOnce(mockError)

      await expect(removeTodoItem(mockId)).rejects.toThrow(mockError)
      expect(axios.delete).toHaveBeenCalledTimes(1)
    })
  })
})
