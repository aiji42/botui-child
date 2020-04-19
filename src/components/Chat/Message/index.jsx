import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {css} from '@emotion/core'
import Bubble from '../Bubble'
import AgentIcon from '../AgentIcon'
import ReactLoading from 'react-loading'
import { CSSTransition } from 'react-transition-group';

const Loading = () => {
  const style = css`
    height: 20px !important;
    position: relative;
    top: -15px;
  `
  return <ReactLoading type="bubbles" height={50} width={50} css={style} />
}

const base = css`
  margin: 10px 0;
  &:after {
    display: block;
    content: "";
    clear: both;
  }
`

const easing = {
  exited: css`
    opacity: 0;
  `,
  entering: css`
    opacity: 0;
    transform: translateY(10px);
  `,
  entered: `
    opacity: 1;
    transform: translateY(0);
    transition: all 300ms ease-out;
  `
}

const Message = ({ content, delay, human, onResolve }) => {
  const [loading, setLoading] = useState(true)
  const [fadeIn, setFadeIn] = useState(false)
  useEffect(() => {
    setFadeIn(true)
    setTimeout(() => { setLoading(false); onResolve() }, delay)
  }, [])

  return (
    <CSSTransition in={fadeIn} timeout={300}>
      {(state) => (
        <div css={[base, easing[state]]}>
          {!human && <AgentIcon />}
          <Bubble content={loading ? <Loading /> : content} human={human} />
        </div>
      )}
    </CSSTransition>
  )
}

Message.defaultProps = {
  delay: 1000,
  human: false,
  onResolve: () => { }
}

Message.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  human: PropTypes.bool.isRequired,
  onResolve: PropTypes.func
}

export default Message