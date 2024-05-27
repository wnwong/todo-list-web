import { useState } from 'react'
import { Todo, createTodoItem, getTodoList, removeTodoItem, updateTodoItem } from '../services/todo-service'

export const useTodo = () => {
  const [data, setData] = useState<Todo[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const refreshList = async () => {
    setIsLoading(true)
    try {
      const todoList = await getTodoList()
      setData(todoList)
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
  return { data, isLoading, error, refreshList, createTodo, updateTodo, removeTodo }
}
