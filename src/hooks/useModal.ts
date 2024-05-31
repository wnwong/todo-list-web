import { useState } from 'react'

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalConetnt, setModalConetnt] = useState<React.ReactElement | null>(null)

  return { isModalOpen, setIsModalOpen, modalConetnt, setModalConetnt, modalTitle, setModalTitle }
}

export default useModal
