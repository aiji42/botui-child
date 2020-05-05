import * as Forms from '../components/Formik/Forms';
import { CashLess } from '../components/CashLess';
import { subscribe } from '../pubSub';
import { dataStore, setting } from '../dataStore';
import * as action from '../components/ChatBot/action';

const Components = { ...Forms, CashLess };

let messageDispatch, handshake;
export const conversationPrepare = (dispatch, hndsk) => {
  messageDispatch = dispatch;
  handshake = hndsk;
};

const findCurrent = ({ id: targetId }) => setting.conversations.find(({ id }) => id === targetId);

const findNext = ({ id }) => setting.conversations.find(({ trigger }) => trigger === id);

export const start = async (id) => {
  const parent = await handshake;
  let next = findCurrent({ id });
  while (next) {
    parent.emit('updateStatus', { id: next.id, action: 'speak'});
    await speak(next);
    next = findNext(next);
  }
};

const speak = async ({ id, actions }) => {
  let isFirstMessage = true;
  for (const action of actions) {
    const { type } = action;
    if (type === 'message') {
      await speakTypeMessage(id, action, isFirstMessage);
      isFirstMessage = false;
    }
    if (type === 'component') {
      await speakTypeComponent(id, action, isFirstMessage);
      isFirstMessage = false;
    }
    if (type === 'function') {
      dataStore[action.function] = await doFunction(action);
      const after = afterFunction(action);
      if (after.type == 'BREAK') break;
      else if (after.type == 'START') await start(after.next.id);
      else continue;
    }
    if (type === 'stop') await new Promise(() => { });
  }
};

const speakTypeMessage = async (id, { options, human }, piton) => {
  if (options.dataStoreAnnounce) options.content = dataStore[options.dataStoreAnnounce];
  await new Promise((onSpoken) => {
    if (human) messageDispatch(action.addMessageHuman({ id, ...options, onSpoken, piton }));
    else messageDispatch(action.addMessageAgent({ id, ...options, onSpoken, piton }));
  });
};

const speakTypeComponent = async (id, { options, human }, piton) => {
  const content = Components[options.content];
  await new Promise((onSubmited) => {
    const props = { onSubmited, onUpdate: () => rollback(id), ...options.props };
    if (human) messageDispatch(action.addComponentHuman({ id, ...options, content, props, delay: 0, piton }));
    else messageDispatch(action.addComponentAgent({ id, ...options, content, props, delay: 0, piton }));
  });
};

const rollback = (id) => {
  messageDispatch(action.rollback(id));
  start(findNext({ id }).id);
};

const doFunction = async ({ human, function: func }) => {
  if (human) messageDispatch(action.relayHuman());
  else messageDispatch(action.relayAgent());
  const parent = await handshake;
  return await new Promise(resolve => {
    subscribe(func, resolve);
    parent.emit(func, dataStore);
  });
};

const afterFunction = ({ function: func, whenReturn }) => {
  if (!whenReturn) return { type: 'CONTINUE' };
  const next = whenReturn[dataStore[func]];
  if (next === 'skip') return { type: 'BREAK' };
  if (typeof next === 'object' && !!next.id) return { type: 'START', next };
  return { type: 'CONTINUE' };
};
