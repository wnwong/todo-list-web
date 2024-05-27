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
    id: number
    name: string
    completed: boolean
    createdAt: Date
    updatedAt: Date
  }[]
}

const apiBaseUrl = 'http://localhost:3001/v1'
const getTodoList = async () => {
  const {
    data: { data },
  } = await axios.get<GetTodoListResponse>(`${apiBaseUrl}/todos`)
  return data.map((todo) => {
    return { id: todo.id, name: todo.name }
  })
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
