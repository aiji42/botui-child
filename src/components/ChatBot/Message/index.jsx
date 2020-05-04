import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {css} from '@emotion/core';
import Bubble from '../Bubble';
import AgentIcon from '../AgentIcon';
import Loading from './Loading';
import Content from './Content';
import { CSSTransition } from 'react-transition-group';
import { Element as ScrollElement } from 'react-scroll';

const base = css`
  margin: 10px 0;
  &:after {
    display: block;
    content: "";
    clear: both;
  }
`;

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
    transition: all 200ms ease-out;
  `
};

const Message = ({ id, content, delay, human, piton, icon, onSpoken }) => {
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setFadeIn(true);
    setTimeout(() => {
      setLoading(false);
      onSpoken();
    }, delay);
  }, [content]);

  return (
    <CSSTransition in={fadeIn} timeout={300}>
      {(state) => (
        <div css={[base, easing[state]]}>
          {piton && <ScrollElement name={`scrollTarget-${id}`} />}
          {!human && <AgentIcon display={icon} />}
          <Bubble human={human}>
            <Content content={loading ? <Loading /> : content} />
          </Bubble>
        </div>
      )}
    </CSSTransition>
  );
};

Message.defaultProps = {
  delay: 1000,
  human: false,
  piton: false,
  icon: true,
  onSpoken: () => { }
};

Message.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  delay: PropTypes.number.isRequired,
  human: PropTypes.bool.isRequired,
  piton: PropTypes.bool.isRequired,
  icon: PropTypes.bool.isRequired,
  onSpoken: PropTypes.func
};

export default Message;