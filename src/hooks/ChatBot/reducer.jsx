import React from 'react';
import Loading from './Loading';

export const messenger = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MESSAGE_HUMAN':
      return [...exposedRelay(state), { human: true, delay: (hasRelay(state) ? 0 : 700), ...action.message }];
    case 'ADD_MESSAGE_AGENT':
      return [...exposedRelay(state), { human: false, delay: (hasRelay(state) ? 0 : 700), ...action.message }];
    case 'ROLLBACK': {
      const index = state.map(({ id }) => id).reverse().indexOf(action.message.id);
      return state.slice().reverse().slice(index).reverse(); // .reverse()破壊的メソッドであるため、.slice()を先に用いる
    }
    case 'RELAY_HUMAN':
      return [...exposedRelay(state), { id: 'RELAY', human: true, content: <Loading />, delay: 0, ...action.message }];
    case 'RELAY_AGENT':
      return [...exposedRelay(state), { id: 'RELAY', human: false, content: <Loading />, delay: 0, ...action.message }];
    default:
      return state;
  }
};

const hasRelay = (state) => state.some(({ id }) => id == 'RELAY');
const exposedRelay = (state) => state.filter(({ id }) => id != 'RELAY');