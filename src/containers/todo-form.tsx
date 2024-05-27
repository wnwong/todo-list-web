import { Button, Form, Input, Space } from 'antd'
import { FormInstance, FormProps } from 'antd/es/form'
import React, { useEffect, useState } from 'react'

interface SubmitButtonProps {
  form: FormInstance
}

export interface TodoFormValue {
  itemName: string
}

interface TodoFormProps extends FormProps {
  formSubmitHandler: (itemId: number, value: TodoFormValue) => void
  itemId?: number
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, children }) => {
  const [submittable, setSubmittable] = useState<boolean>(false)

  // Watch all values
  const values = Form.useWatch([], form)

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false))
  }, [form, values])

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  )
}

const TodoForm: React.FC<TodoFormProps> = ({ formSubmitHandler, itemId = -1, ...rest }: TodoFormProps) => {
  const [form] = Form.useForm()

  const handleFormSubmitted = (value: TodoFormValue) => {
    formSubmitHandler(itemId, value)
  }
  return (
    <Form form={form} name="todo-form" layout="vertical" autoComplete="off" onFinish={handleFormSubmitted} {...rest}>
      <Form.Item
        name="itemName"
        label="Item Name"
        rules={[
          { required: true, message: 'Item name is required' },
          { max: 50, message: 'Maximum of 50 characters is allowed' },
        ]}
      >
        <Input placeholder="Max. 50 characters" />
      </Form.Item>
      <Form.Item>
        <Space>
          <SubmitButton form={form}>Submit</SubmitButton>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default TodoForm
