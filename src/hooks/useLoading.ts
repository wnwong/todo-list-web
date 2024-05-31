import { useState } from 'react'

interface UseLoadingReturn {
  loading: boolean
  loadingMessage: string
  showLoading: (message?: string) => void
  hideLoading: () => void
}

const useLoading = (initialMessage = 'Loading...'): UseLoadingReturn => {
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(initialMessage)

  const showLoading = (message = initialMessage) => {
    setLoadingMessage(message)
    setLoading(true)
  }

  const hideLoading = () => {
    setLoading(false)
  }

  return { loading, loadingMessage, showLoading, hideLoading }
}

export default useLoading
