import { Flex, Layout, Modal } from 'antd'
import React from 'react'
import TodoList from './containers/todo-list'
import { useModal } from './hooks/useModal'
import { APP } from './lib/constants'
const { Header, Content } = Layout

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  color: 'white',
}

const App: React.FC = () => {
  const { isModalOpen, setIsModalOpen, modalConetnt, setModalConetnt, modalTitle, setModalTitle } = useModal()

  const modalHandler = (isOpen: boolean) => {
    return setIsModalOpen(isOpen)
  }

  const modalContentHandler = (title: string, content: React.ReactElement) => {
    setModalTitle(title)
    setModalConetnt(content)
  }

  const handleModelCancelled = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setIsModalOpen(false)
  }

  return (
    <Flex justify="space-between" vertical style={{ height: '100vh' }}>
      <Layout>
        <Header style={headerStyle}>{APP.header}</Header>
        <Content style={{ padding: '0 48px' }}>
          <TodoList modalhandler={modalHandler} modalContentHandler={modalContentHandler} />
        </Content>
        <Modal
          title={modalTitle}
          open={isModalOpen}
          footer={null}
          destroyOnClose
          centered
          mask
          onCancel={handleModelCancelled}
        >
          {modalConetnt}
        </Modal>
      </Layout>
    </Flex>
  )
}

export default App
