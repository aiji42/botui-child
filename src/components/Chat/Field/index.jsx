import React, { useState } from 'react'
import { css } from '@emotion/core'
import Message from '../Message'
import FormName from '../../Formik/Forms/FormName'

const base = css`
  padding: 0px 15px 100px 15px;
`

const makeMassages = (messages, setMessages) => () => {
  if (messages.length < 5) setMessages([...messages, { content: 'ああああああああああああ', human: false, delay: 500 }])
  if (messages.length >= 5 && messages.length < 8) setMessages([...messages, { content: <FormName />, human: true, delay: 0 }])
}

const Field = () => {
  const [messages, setMessages] = useState([{ content: 'ああああああああああああ', human: false, delay: 500 }])

  return (
    <div css={base}>
      {messages.map((message, i) => (
        <Message {...message} onResolve={makeMassages(messages, setMessages)} key={i} />
      ))}
    </div>
  )
}

export default Field