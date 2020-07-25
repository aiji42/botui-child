import { useReducer, useEffect } from 'react';
import { messenger } from './reducer';
import { usePostRobotSend } from '../PostRobot';
import { dataStore, setting } from '../../dataStore';
import * as action from './action';
import * as Components from './Formik/Forms';

const prepare = ({ data }) => Object.keys(data).forEach(key => setting[key] = data[key]);

const findCurrent = ({ id: targetId }) => setting.conversations.find(({ id }) => id === targetId);

const findNext = ({ id }) => setting.conversations.find(({ trigger }) => trigger === id);

const isFirstMessage = (actions, action) => actions.find(({ type }) => ['message', 'component'].includes(type)) == action;

const stop = () => new Promise(() => { });

export const useChatBot = () => {
  const [messages, dispatch] = useReducer(messenger, []);
  const handleReady = usePostRobotSend('onReady');
  const notifyParent = usePostRobotSend('updateStatus');
  const emitter = usePostRobotSend('emit');

  useEffect(() => {
    handleReady().then((e) => {
      prepare(e);
      start('hello');
    });
  }, []);

  const start = async (id) => {
    let next = findCurrent({ id });
    while (next) {
      notifyParent({ id: next.id, action: 'speak' });
      await speak(next);
      next = findNext(next);
    }
  };

  const speak = async ({ id, actions }) => {
    for (const action of actions) {
      const { type } = action;
      if (type === 'stop') await stop();
      if (type === 'message') await speakTypeMessage(id, action, isFirstMessage(actions, action));
      if (type === 'component') await speakTypeComponent(id, action, isFirstMessage(actions, action));
      if (type === 'function') await doFunction(action);

      if (await after(action)) break;
    }
  };

  const speakTypeMessage = async (id, { options, human }, piton) => {
    if (options.dataStoreAnnounce) options.content = dataStore[options.dataStoreAnnounce];
    await new Promise((onSpoken) => {
      if (human) dispatch(action.addMessageHuman({ id, ...options, onSpoken, piton }));
      else dispatch(action.addMessageAgent({ id, ...options, onSpoken, piton }));
    });
  };

  const speakTypeComponent = async (id, { options, human }, piton) => {
    const content = Components[options.content];
    await new Promise((onSubmited) => {
      const props = { onSubmited, onUpdate: () => rollback(id), ...options.props };
      if (human) dispatch(action.addComponentHuman({ id, ...options, content, props, delay: 0, piton }));
      else dispatch(action.addComponentAgent({ id, ...options, content, props, delay: 0, piton }));
    });
  };

  const rollback = (id) => {
    dispatch(action.rollback(id));
    start(findNext({ id }).id);
  };

  const doFunction = async ({ human, function: func }) => {
    if (human) dispatch(action.relayHuman());
    else dispatch(action.relayAgent());
    const { data } = await emitter({ key: func, data: dataStore });
    dataStore[func] = data;
  };

  const after = async ({ function: func, whenReturn }) => {
    if (!whenReturn) return false;
    const next = whenReturn[dataStore[func]];
    if (next === 'skip') return true;
    if (typeof next === 'object' && !!next.id) await start(next.id);
    return false;
  };

  return messages;
};