import React from 'react';
import * as Forms from '../components/Formik/Forms';
import { CashLess } from '../components/CashLess';
import { subscribe } from '../pubSub';
import handshake from '../handshake';
import { dataStore, setting } from '../dataStore';
import { scroller } from 'react-scroll';

const Components = { ...Forms, CashLess };

let messageDispatch = () => { };
export const setDispatch = (dispatch) => messageDispatch = dispatch;

const findCurrent = ({ id: targetId }) => setting.conversations.find(({ id }) => id === targetId);

const findNext = ({ id }) => setting.conversations.find(({ trigger }) => trigger === id);

const conversationIds = () => {
  let ids = [];
  let next = findCurrent({ id: 'hello' });
  while (next) {
    ids.push(next.id);
    next = findNext(next);
  }
  return ids;
};

const progress = ({ id }) => {
  return conversationIds().indexOf(id) / conversationIds().length * 100;
};

const remaining = ({ id }) => {
  let convs = [];
  let next = findCurrent({ id: 'hello' });
  let isOver = false;
  while (next) {
    !isOver && (isOver = next.id === id);
    if (isOver) convs.push({ id: next.id, countable: !!next.countable });
    next = findNext(next);
  }
  return convs.filter(({ countable }) => countable).length;
};

export const start = async (id) => {
  const parent = await handshake;
  let next = findCurrent({ id });
  while (next) {
    parent.emit('updateFooter', [progress(next), remaining(next)]);
    await datalayerPushEvent(next);
    await speak(next);
    next = findNext(next);
  }
};

const speak = async ({ id, actions }) => {
  let isFirstMessage = true;
  for (const action of actions) {
    console.log(action);
    const { type } = action;
    if (type === 'message') {
      await speakTypeMessage(id, action, isFirstMessage);
      isFirstMessage = false;
    }
    if (type === 'component') await speakTypeComponent(id, action);
    if (type === 'function') {
      const { function: func, whenReturn } = action;
      dataStore[func] = await doFunction(action);
      if (!whenReturn) continue;
      const next = whenReturn[dataStore[func]];
      if (next === 'skip') break;
      if (typeof next === 'object' && !!next.id) await start(next.id);
    }
    if (type === 'stop') await stop();
  }
};

const speakTypeMessage = async (id, { options, human }, piton) => {
  if (options.dataStoreAnnounce) options.content = dataStore[options.dataStoreAnnounce];
  await new Promise((resolve) => {
    messageDispatch({ type: 'ADD', message: { id, ...options, human: !!human, piton, onSpoken: resolve } });
  });
};

const speakTypeComponent = async (id, { options, human }) => {
  const rollback = () => {
    messageDispatch({ type: 'ROLLBACK', message: { id } });
    start(findNext({ id }).id);
  };
  const makeHandeleSubmited = (resolve) => {
    let submitedCount = 0;
    return () => {
      submitedCount < 1 ? resolve() : rollback();
      submitedCount += 1;
    };
  };
  const Component = Components[options.content];
  await new Promise((resolve) => {
    messageDispatch({
      type: 'ADD', message: {
        id, delay: 0, ...options, content: <Component onSubmited={makeHandeleSubmited(resolve)} />, human: !!human,
        onSpoken: () => { scroller.scrollTo(`scrollTarget-${id}`, { smooth: true, offset: -5, duration: 600 }); }
      }
    });
  });
};

const doFunction = async ({ human, function: func }) => {
  messageDispatch({ type: 'RELLAY', message: { human: !!human } });
  const parent = await handshake;
  return await new Promise(resolve => {
    subscribe(func, resolve);
    parent.emit(func, dataStore);
  });
};

const stop = async () => new Promise(() => { });

const datalayerPushEvent = async ({ id }) => {
  const parent = await handshake;
  const index = conversationIds().indexOf(id) < 0 ? 99 : conversationIds().indexOf(id);
  parent.emit('dataLayerPush', {
    event: 'analytics',
    eventCategory: 'botui-child',
    eventAction: 'speak',
    eventLabel: `${('00' + index).slice(-2)}_${id}`,
  });
};
