import React, { ReactElement } from 'react'
import { Button as AntButton, ButtonProps } from 'antd'

interface Props extends ButtonProps {
  children?: string | ReactElement
  success?: boolean
}

const buttonStyle: React.CSSProperties = {
  textTransform: 'capitalize',
}

const successButtonStyle: React.CSSProperties = {
  color: 'green',
}

const Button: React.FC<Props> = ({ children, success, ...rest }: Props) => {
  let buttonStyles = buttonStyle
  if (success) {
    buttonStyles = { ...buttonStyles, ...successButtonStyle }
  }
  return (
    <AntButton style={buttonStyles} {...rest}>
      {children}
    </AntButton>
  )
}

export default Button
