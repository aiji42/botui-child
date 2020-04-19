import React from 'react'
import {css} from '@emotion/core'
import icon from './operator.jpg'

const base = css`
  position: relative;
  float: left;
  margin-right: 5px;
`

const image = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #0f84fe;
`

const AgentIcon = () => {
  return (
    <div css={base}>
      <img src={icon} css={image} />
    </div>
  )
}

export default AgentIcon