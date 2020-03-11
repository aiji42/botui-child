import Postmate from 'postmate';
import { publish } from '../pubSub';
import { start } from '../conversation';
import { setting } from '../dataStore';

const handshake = new Postmate.Model({
  publishMessage: ([topic, message]) => publish(topic, message),
  startChat: () => start('hello')
});

export const prepare = async () => {
  const parent = await handshake;
  const { setting: fromParent } = parent.model;

  Object.keys(fromParent).forEach(key => {
    setting[key] = fromParent[key];
  });
};

export default handshake;