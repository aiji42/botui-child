import Chat from './Chat';
import * as Forms from '../components/Formik/Forms';
import { CashLess } from '../components/CashLess';
import { publish, subscribe } from '../PubSub';
import { handshake } from '../handshake';
import { dataStore, setting } from '../dataStore';

const Components = { ...Forms, CashLess };

export const conversation = async (startId) => {
  let next = findCurrent({ id: startId });
  while (next) {
    await speak(next);
    next = findNext(next);
    publish('progressPercentage', progress(next));
  }
};

const speak = async ({ actions, id }) => {
  for (const action of actions) {
    const { human, type, options, function: func } = action;
    if (type === 'message') {
      human ? await Chat.sayHuman(options) : await Chat.sayBot(options);
    } else if (type === 'component') {
      if (human) await Chat.sayHumanWithComponent({ ...options, content: Components[options.content], id });
      else await Chat.sayBotWithComponent({ ...options, content: Components[options.content], id });
    } else if (type === 'function') {
      Chat.relay();
      const parent = await handshake;
      const result = await new Promise(resolve => {
        subscribe(func, resolve);
        parent.emit(func, dataStore);
      });
      dataStore[func] = result;
      if (action.whenReturn && action.whenReturn[result] === 'skip') break;
    }
  }
};

export const findCurrent = ({ id: targetId }) => setting.conversations.find(({ id }) => id === targetId);

export const findNext = ({ id }) => setting.conversations.find(({ trigger }) => trigger === id);

export const progress = ({ id }) => {
  let convs = [];
  let next = findCurrent({ id: 'hello' });
  while (next) {
    convs.push(next.id);
    next = findNext(next);
  }
  return convs.indexOf(id) / convs.length * 100;
};