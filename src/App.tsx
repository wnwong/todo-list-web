import { Flex, Layout, Modal } from 'antd'
import React from 'react'
import TodoList from './containers/todo-list'
import useModal from './hooks/useModal'
import { APP } from './lib/constants'
const { Header, Content } = Layout

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  color: 'white',
}

const contentStyle: React.CSSProperties = {
  padding: '0 48px',
}

const containerStyle: React.CSSProperties = {
  height: '100vh',
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
    <Flex justify="center" vertical style={containerStyle}>
      <Layout>
        <Header data-testid="app-header" style={headerStyle}>
          {APP.header}
        </Header>
        <Content style={contentStyle}>
          <TodoList data-testid="todo-list" modalhandler={modalHandler} modalContentHandler={modalContentHandler} />
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
