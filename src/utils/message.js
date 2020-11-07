import React from 'react'
import { Message } from 'semantic-ui-react'

export const OkMessage = ({ msg }) => {
  return (
    <Message
      info
      content={msg}
    />
  )
}

export const ErrMessage = ({ msg }) => {
  return (
    <Message
      error
      content={msg}
    />
  )
}
