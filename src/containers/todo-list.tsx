import { Flex, Layout, List } from 'antd'
import React, { useEffect, useMemo } from 'react'
import Button from '../components/button'
import useTodo from '../hooks/useTodo'
import TodoForm, { TodoFormValue } from './todo-form'
import useLoading from '../hooks/useLoading'
import Loading from '../components/loading'

interface Props {
  modalhandler: (isOpen: boolean) => void
  modalContentHandler: (title: string, content: React.ReactElement) => void
}

const buttonRowStyle: React.CSSProperties = {
  marginTop: '8px',
}

const TodoList: React.FC<Props> = ({ modalhandler, modalContentHandler, ...rest }: Props) => {
  const { data = [], refreshList, createTodo, updateTodo, removeTodo, isLoading } = useTodo()
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

  const renderCreateButton = () => {
    return (
      <Button type="primary" onClick={() => handleCreateButtonClicked()}>
        create
      </Button>
    )
  }

  const renderListHeader = () => {
    return <div>Item</div>
  }

  const renderEditButton = (id: number, name: string) => {
    return (
      <Button type="link" onClick={() => handleEditButtonClicked(id, name)} data-testid={`edit-button-${id}`}>
        edit
      </Button>
    )
  }

  const renderDeleteButton = (id: number) => {
    return (
      <Button type="link" danger onClick={() => handleDeleteButtonClicked(id)} data-testid={`delete-button-${id}`}>
        delete
      </Button>
    )
  }

  return (
    <Layout>
      <Flex style={buttonRowStyle} align="flex-end" vertical>
        {renderCreateButton()}
      </Flex>
      <List
        header={renderListHeader()}
        itemLayout="horizontal"
        dataSource={todoList}
        renderItem={(item) => (
          <List.Item actions={[renderEditButton(item.id, item.name), renderDeleteButton(item.id)]}>
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
