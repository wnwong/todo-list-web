import { useState } from 'react'

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalConetnt, setModalConetnt] = useState<React.ReactElement>()

  return { isModalOpen, setIsModalOpen, modalConetnt, setModalConetnt, modalTitle, setModalTitle }
}
