import { renderHook } from '@testing-library/react'
import { useTodo } from './useTodo'
describe('useTodo', () => {
  it('should return initial value', () => {
    const { result } = renderHook(() => useTodo())
    const { data, isLoading, error } = result.current
    expect(data).toBe(null)
    expect(isLoading).toBe(false)
    expect(error).toBe(null)
  })
})
