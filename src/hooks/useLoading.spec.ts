import { renderHook, act } from '@testing-library/react'
import useLoading from './useLoading'

describe('useLoading', () => {
  it('should return the correct initial state', () => {
    const { result } = renderHook(() => useLoading())

    expect(result.current.loading).toBe(false)
    expect(result.current.loadingMessage).toBe('Loading...')
  })

  it('should update the loading state and message when showLoading is called', () => {
    const { result } = renderHook(() => useLoading())

    act(() => {
      result.current.showLoading('Fetching data...')
    })

    expect(result.current.loading).toBe(true)
    expect(result.current.loadingMessage).toBe('Fetching data...')
  })

  it('should reset the loading state when hideLoading is called', () => {
    const { result } = renderHook(() => useLoading())

    act(() => {
      result.current.showLoading('Fetching data...')
    })

    expect(result.current.loading).toBe(true)

    act(() => {
      result.current.hideLoading()
    })

    expect(result.current.loading).toBe(false)
  })

  it('should use the provided initial message', () => {
    const { result } = renderHook(() => useLoading('Loading data...'))

    expect(result.current.loadingMessage).toBe('Loading data...')
  })
})
