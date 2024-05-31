import { renderHook } from '@testing-library/react'
import useModal from './useModal'
describe('useModal', () => {
  it('should return initial value', () => {
    const { result } = renderHook(() => useModal())
    const { isModalOpen, modalTitle, modalConetnt } = result.current
    expect(isModalOpen).toBe(false)
    expect(modalTitle).toBe('')
    expect(modalConetnt).toBe(null)
  })
})
