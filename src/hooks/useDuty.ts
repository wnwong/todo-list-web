import { useState } from 'react'
import { Duty, createTodoItem, getTodoList, removeTodoItem, updateTodoItem } from '../services/todo-service'

export const useDuty = () => {
  const [data, setData] = useState<Duty[] | null>(null)
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

  const createDuty = async (name: string) => {
    setIsLoading(true)
    try {
      await createTodoItem(name)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateDuty = async (id: number, name: string) => {
    setIsLoading(true)
    try {
      await updateTodoItem(id, name)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeDuty = async (id: number) => {
    setIsLoading(true)
    try {
      await removeTodoItem(id)
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }
  return { data, isLoading, error, refreshList, createDuty, updateDuty, removeDuty }
}
