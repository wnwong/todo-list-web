import axios from 'axios'
import { getTodoList } from './todo-service'
jest.mock('axios', () => {
  return {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  }
})
describe('todo-service', () => {
  it('should return todo list with correct data structure', async () => {
    const itemId = 1
    const itemName = 'talk to john'
    ;(axios.get as jest.Mock).mockImplementation(() => {
      return {
        data: {
          status: 'success',
          data: [
            {
              id: itemId,
              name: itemName,
              createdAt: '2024-05-30T01:15:30.560Z',
              updatedAt: '2024-05-30T01:15:30.560Z',
            },
          ],
        },
      }
    })
    const result = await getTodoList()
    expect(result).toEqual([{ id: itemId, name: itemName }])
  })
})
