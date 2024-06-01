import { useState } from 'react'
import {
  Todo,
  createTodoItem,
  getTodoList,
  completeTodoItem,
  removeTodoItem,
  updateTodoItem,
} from '../services/todo-service'

const useTodo = () => {
  const [data, setData] = useState<Todo[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const refreshList = async (currentPage: number = 1) => {
    setIsLoading(true)
    try {
      const { data, totalPages } = await getTodoList(currentPage)
      setData(data)
      setPage(currentPage)
      setTotalPages(totalPages)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const createTodo = async (name: string) => {
    setIsLoading(true)
    try {
      await createTodoItem(name)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateTodo = async (id: number, name: string) => {
    setIsLoading(true)
    try {
      await updateTodoItem(id, name)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const completeTodo = async (id: number) => {
    setIsLoading(true)
    try {
      await completeTodoItem(id)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeTodo = async (id: number) => {
    setIsLoading(true)
    try {
      await removeTodoItem(id)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }
  return { data, isLoading, error, refreshList, createTodo, updateTodo, completeTodo, removeTodo, page, totalPages }
}

export default useTodo
