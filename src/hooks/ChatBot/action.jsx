import React from 'react';
import { scroller } from 'react-scroll';


export const addMessageHuman = ({ id, content, piton = false, onSpoken = () => { }, ...options } = {}) => ({
  type: 'ADD_MESSAGE_HUMAN',
  message: {
    id, content, piton,
    onSpoken: () => {
      onSpoken();
      scrollTo(id);
    },
    ...options
  }
});

export const addMessageAgent = ({ id, content, piton = false, onSpoken = () => { }, ...options } = {}) => ({
  type: 'ADD_MESSAGE_AGENT',
  message: {
    id, content, piton,
    onSpoken: () => {
      onSpoken();
      scrollTo(id);
    },
    ...options
  }
});

export const addComponentHuman = ({ id, content, props = {}, piton = false, onSpoken = () => { }, ...options } = {}) => {
  const Component = content;
  return {
    type: 'ADD_MESSAGE_HUMAN',
    message: {
      id, content: <Component {...props} />, piton,
      onSpoken: () => {
        onSpoken();
        scrollTo(id);
      },
      ...options
    }
  };
};

export const addComponentAgent = ({ id, content, props = {}, piton = false, onSpoken = () => { }, ...options } = {}) => {
  const Component = content;
  return {
    type: 'ADD_MESSAGE_AGENT',
    message: {
      id, content: <Component {...props} />, piton,
      onSpoken: () => {
        onSpoken();
        scrollTo(id);
      },
      ...options
    }
  };
};

export const rollback = (id) => ({
  type: 'ROLLBACK',
  message: { id }
});

export const relayHuman = () => ({
  type: 'RELAY_HUMAN'
});

export const relayAgent = () => ({
  type: 'RELAY_AGENT'
});

const scrollTo = (id) => scroller.scrollTo(`scrollTarget-${id}`, { smooth: true, offset: -5, duration: 600 });