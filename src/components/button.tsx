import React, { ReactElement } from 'react'
import { Button as AntButton, ButtonProps } from 'antd'

interface Props extends ButtonProps {
  children: string | ReactElement
}

const buttonStyle: React.CSSProperties = {
  textTransform: 'capitalize',
}

const Button: React.FC<Props> = ({ children, ...rest }: Props) => {
  return (
    <AntButton style={buttonStyle} {...rest}>
      {children}
    </AntButton>
  )
}

export default Button
