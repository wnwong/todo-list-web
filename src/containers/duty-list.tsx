import { Flex, Layout, List } from 'antd'
import React, { useEffect, useMemo } from 'react'
import { useDuty } from '../hooks/useDuty'
import Button from '../components/button'
import DutyForm, { DutyFormValue } from './duty-form'

interface Props {
  modalhandler: (isOpen: boolean) => void
  modalContentHandler: (title: string, content: React.ReactElement) => void
}

const buttonRowStyle: React.CSSProperties = {
  marginTop: '8px',
}

const DutyList: React.FC<Props> = ({ modalhandler, modalContentHandler }: Props) => {
  const { data = [], refreshList, createDuty, updateDuty, removeDuty } = useDuty()
  const dutyList = useMemo(
    () =>
      data?.map((duty) => {
        return { id: duty.id, name: duty.name }
      }),
    [data]
  )

  useEffect(() => {
    refreshList()
  }, [])

  const handleFormSubmitted = async (id: number, value: DutyFormValue) => {
    await createDuty(value.itemName)
    await refreshList()
    modalhandler(false)
  }

  const handleFormEdited = async (id: number, value: DutyFormValue) => {
    await updateDuty(id, value.itemName)
    await refreshList()
    modalhandler(false)
  }

  const handleCreateButtonClicked = () => {
    modalContentHandler('Create New Duty', <DutyForm formSubmitHandler={handleFormSubmitted} />)
    modalhandler(true)
  }

  const handleEditButtonClicked = (id: number, name: string) => {
    modalContentHandler(
      'Edit Duty',
      <DutyForm formSubmitHandler={handleFormEdited} itemId={id} initialValues={{ itemName: name }} />
    )
    modalhandler(true)
  }

  const handleDeleteButtonClicked = async (id: number) => {
    await removeDuty(id)
    await refreshList()
  }

  const renderCreateButton = () => {
    return (
      <Button type="primary" onClick={() => handleCreateButtonClicked()}>
        create
      </Button>
    )
  }

  const renderEditButton = (id: number, name: string) => {
    return (
      <Button type="link" onClick={() => handleEditButtonClicked(id, name)}>
        edit
      </Button>
    )
  }

  const renderDeleteButton = (id: number) => {
    return (
      <Button type="link" danger onClick={() => handleDeleteButtonClicked(id)}>
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
        itemLayout="horizontal"
        dataSource={dutyList}
        renderItem={(item) => (
          <List.Item actions={[renderEditButton(item.id, item.name), renderDeleteButton(item.id)]}>
            <List.Item style={{ textWrap: 'wrap', whiteSpace: 'normal' }} />
            {item.name}
          </List.Item>
        )}
      />
    </Layout>
  )
}

export default DutyList
