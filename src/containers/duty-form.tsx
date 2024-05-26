import { Button, Form, Input, Space } from 'antd'
import { FormInstance, FormProps } from 'antd/es/form'
import React, { useEffect, useState } from 'react'

interface SubmitButtonProps {
  form: FormInstance
}

export interface DutyFormValue {
  itemName: string
}

interface DutyFormProps extends FormProps {
  formSubmitHandler: (itemId: number, value: DutyFormValue) => void
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

const DutyForm: React.FC<DutyFormProps> = ({ formSubmitHandler, itemId = -1, ...rest }: DutyFormProps) => {
  const [form] = Form.useForm()

  const handleFormSubmitted = (value: DutyFormValue) => {
    formSubmitHandler(itemId, value)
  }
  return (
    <Form form={form} name="duty-form" layout="vertical" autoComplete="off" onFinish={handleFormSubmitted} {...rest}>
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

export default DutyForm
