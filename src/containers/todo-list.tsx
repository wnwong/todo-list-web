import { Flex, Layout, List, Popconfirm } from 'antd'
import React, { useEffect, useMemo } from 'react'
import Button from '../components/button'
import { CheckCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import useTodo from '../hooks/useTodo'
import TodoForm, { TodoFormValue } from './todo-form'
import useLoading from '../hooks/useLoading'
import Loading from '../components/loading'
import { Typography } from 'antd'

interface Props {
  modalhandler: (isOpen: boolean) => void
  modalContentHandler: (title: string, content: React.ReactElement) => void
}

const buttonRowStyle: React.CSSProperties = {
  marginTop: '8px',
}

const listItemStyle: React.CSSProperties = {
  flexWrap: 'nowrap',
  wordBreak: 'break-all',
}
const { Title } = Typography
const TodoList: React.FC<Props> = ({ modalhandler, modalContentHandler, ...rest }: Props) => {
  const {
    data = [],
    refreshList,
    createTodo,
    updateTodo,
    completeTodo,
    removeTodo,
    isLoading,
    page,
    totalPages,
  } = useTodo()
  const { loading, loadingMessage, showLoading, hideLoading } = useLoading()

  const todoList = useMemo(
    () =>
      data?.map((todo) => {
        return { id: todo.id, name: todo.name }
      }),
    [data]
  )

  useEffect(() => {
    refreshList()
  }, [])

  useEffect(() => {
    if (isLoading) {
      showLoading()
      return
    }
    hideLoading()
  }, [isLoading])

  const handleFormSubmitted = async (id: number, value: TodoFormValue) => {
    await createTodo(value.itemName)
    await refreshList()
    modalhandler(false)
  }

  const handleFormEdited = async (id: number, value: TodoFormValue) => {
    await updateTodo(id, value.itemName)
    await refreshList()
    modalhandler(false)
  }

  const handleCreateButtonClicked = () => {
    modalContentHandler('Create New Todo', <TodoForm formSubmitHandler={handleFormSubmitted} />)
    modalhandler(true)
  }

  const handleEditButtonClicked = (id: number, name: string) => {
    modalContentHandler(
      'Edit Todo',
      <TodoForm formSubmitHandler={handleFormEdited} itemId={id} initialValues={{ itemName: name }} />
    )
    modalhandler(true)
  }

  const handleDeleteButtonClicked = async (id: number) => {
    await removeTodo(id)
    await refreshList()
  }

  const handleCompleteButtonClicked = async (id: number) => {
    await completeTodo(id)
    await refreshList()
  }

  const renderCreateButton = () => {
    return (
      <Button type="primary" onClick={() => handleCreateButtonClicked()}>
        create
      </Button>
    )
  }

  const renderListHeader = () => {
    return <Title level={3}>Todo Items</Title>
  }

  const renderEditButton = (id: number, name: string) => {
    return (
      <Button
        type="link"
        shape="circle"
        icon={<EditOutlined />}
        onClick={() => handleEditButtonClicked(id, name)}
        data-testid={`edit-button-${id}`}
      >
        edit
      </Button>
    )
  }

  const renderDeleteButton = (id: number) => {
    return (
      <Popconfirm
        title="Are you sure you want to delete this todo item?"
        onConfirm={() => handleDeleteButtonClicked(id)}
        okText="Yes"
        cancelText="No"
        okButtonProps={{ 'data-testid': `delete-confirm-${id}` }}
        cancelButtonProps={{ 'data-testid': `delete-cancel-${id}` }}
      >
        <Button
          type="link"
          danger
          shape="circle"
          icon={<DeleteOutlined />}
          data-testid={`delete-button-${id}`}
        ></Button>
      </Popconfirm>
    )
  }

  const renderCompleteButton = (id: number) => {
    return (
      <Popconfirm
        title="Are you sure you want to complete this todo item?"
        onConfirm={() => handleCompleteButtonClicked(id)}
        okText="Yes"
        cancelText="No"
        okButtonProps={{ 'data-testid': `complete-confirm-${id}` }}
        cancelButtonProps={{ 'data-testid': `complete-cancel-${id}` }}
      >
        <Button
          type="link"
          success
          shape="circle"
          icon={<CheckCircleOutlined />}
          data-testid={`complete-button-${id}`}
        ></Button>
      </Popconfirm>
    )
  }

  const handlePageChange = (currentPage: number) => {
    refreshList(currentPage)
  }

  return (
    <Layout>
      <Flex style={buttonRowStyle} align="flex-end" vertical>
        {renderCreateButton()}
      </Flex>
      <List
        pagination={{ current: page, total: totalPages * 10, pageSize: 10, onChange: handlePageChange }}
        header={renderListHeader()}
        itemLayout="horizontal"
        dataSource={todoList}
        renderItem={(item) => (
          <List.Item
            style={listItemStyle}
            actions={[renderEditButton(item.id, item.name), renderCompleteButton(item.id), renderDeleteButton(item.id)]}
          >
            {item.name}
          </List.Item>
        )}
        {...rest}
      />
      {loading && <Loading message={loadingMessage} />}
    </Layout>
  )
}

export default TodoList
