import axios from 'axios'

export interface Todo {
  id: number
  name: string
}

export interface GenericApiResponse {
  status: string
}

export interface GetTodoListResponse extends GenericApiResponse {
  data: {
    todoList: {
      id: number
      name: string
      completed: boolean
      createdAt: Date
      updatedAt: Date
    }[]
    totalPages: number
  }
}

const apiUrl = process.env.REACT_APP_API_URL
const apiBaseUrl = `${apiUrl}/api/v1`
const getTodoList = async (currentPage: number) => {
  const {
    data: {
      data: { todoList, totalPages },
    },
  } = await axios.get<GetTodoListResponse>(`${apiBaseUrl}/todos?page=${currentPage}&limit=10`)
  const list = todoList.map((todo) => {
    return { id: todo.id, name: todo.name }
  })
  return {
    data: list,
    totalPages,
  }
}

const createTodoItem = (name: string) => {
  return axios.post<GenericApiResponse>(`${apiBaseUrl}/todos`, { name })
}

const updateTodoItem = (id: number, name: string) => {
  return axios.put<GenericApiResponse>(`${apiBaseUrl}/todos/${id}`, { name })
}

const removeTodoItem = (id: number) => {
  return axios.delete<GetTodoListResponse>(`${apiBaseUrl}/todos/${id}`)
}

export { getTodoList, createTodoItem, updateTodoItem, removeTodoItem }
