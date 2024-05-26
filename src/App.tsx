import React from 'react'
import { Flex, Layout, Modal } from 'antd'
import DutyList from './containers/duty-list'
import { useModal } from './hooks/useModal'
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

  return (
    <Flex justify="space-between" vertical style={{ height: '100vh' }}>
      <Layout>
        <Header style={headerStyle}>Simple Todo List</Header>
        <Content style={{ padding: '0 48px' }}>
          <DutyList modalhandler={modalHandler} modalContentHandler={modalContentHandler} />
        </Content>
        <Modal title={modalTitle} open={isModalOpen} footer={null} destroyOnClose centered mask>
          {modalConetnt}
        </Modal>
      </Layout>
    </Flex>
  )
}

export default App
