import { Flex, Spin, Typography } from 'antd'
import React from 'react'

const { Text } = Typography

interface LoadingProps {
  message?: string
}

const loadingStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 999,
}

const loadingTextStyle: React.CSSProperties = {
  color: 'white',
  marginTop: '16px',
}
const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
  return (
    <Flex data-testid="loading-container" style={loadingStyle}>
      <Spin data-testid="loading-spinner" size="large" />
      <Text style={loadingTextStyle}>{message}</Text>
    </Flex>
  )
}

export default Loading
