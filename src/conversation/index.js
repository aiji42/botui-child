import { sayBot, sayHuman, sayBotComponent, sayHumanComponent, relay } from '../chat';
import * as Forms from '../components/Formik/Forms';
import { CashLess } from '../components/CashLess';
import { subscribe } from '../pubSub';
import handshake from '../handshake';
import { dataStore, setting } from '../dataStore';

const Components = { ...Forms, CashLess };

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
  for (const action of actions) {
    const { type } = action;
    if (type === 'message') await speakTypeMessage(action);
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

const speakTypeMessage = async ({ human, options }) => {
  if (options.dataStoreAnnounce) {
    options.content = dataStore[options.dataStoreAnnounce];
    delete options.dataStoreAnnounce;
  }
  await (human ? sayHuman(options) : sayBot(options));
};

const speakTypeComponent = async (id, { human, options }) => {
  const content = Components[options.content];
  const whenRollback = () => start(findNext({ id }).id);
  if (human) await sayHumanComponent({ ...options, content, whenRollback });
  else await sayBotComponent({ ...options, content, whenRollback });
};

const doFunction = async ({ function: func }) => {
  await relay();
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
