import { sayBot, sayHuman, sayBotComponent, sayHumanComponent, relay } from '../chat';
import * as Forms from '../components/Formik/Forms';
import { CashLess } from '../components/CashLess';
import { publish, subscribe } from '../pubSub';
import { handshake } from '../handshake';
import { dataStore, setting } from '../dataStore';

const Components = { ...Forms, CashLess };

const findCurrent = ({ id: targetId }) => setting.conversations.find(({ id }) => id === targetId);

const findNext = ({ id }) => setting.conversations.find(({ trigger }) => trigger === id);

const progress = ({ id }) => {
  let convs = [];
  let next = findCurrent({ id: 'hello' });
  while (next) {
    convs.push(next.id);
    next = findNext(next);
  }
  return convs.indexOf(id) / convs.length * 100;
};

export const start = async (id) => {
  let next = findCurrent({ id });
  while (next) {
    publish('progressPercentage', progress(next));
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
      if (whenReturn && whenReturn[dataStore[func]] === 'skip') break;
    }
  }
};

const speakTypeMessage = async ({ human, options }) => await (human ? sayHuman(options) : sayBot(options));

const speakTypeComponent = async (id, { human, options }) => {
  const content = Components[options.content];
  const whenRollback = () => start(findNext({ id }).id);
  if (human) await sayHumanComponent({ ...options, content, whenRollback });
  else await sayBotComponent({ ...options, content, whenRollback });
};

const doFunction = async ({ function: func }) => {
  relay();
  const parent = await handshake;
  return await new Promise(resolve => {
    subscribe(func, resolve);
    parent.emit(func, dataStore);
  });
};