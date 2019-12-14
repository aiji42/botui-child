import Postmate from 'postmate';
import { publish, subscribe } from '../PubSub';
import { setting } from '../dataStore';
import { conversation } from '../conversation';

export const handshake = new Postmate.Model({
  setting: (data) => {
    Object.keys(data).forEach(key => {
      setting[key] = data[key];
      publish(`setting.${key}`);
    });
    publish('readyToChatStart');
  },
  publishMessage: ([topic, message]) => publish(topic, message),
  chatStart: () => conversation('hello')
});

subscribe('readyToChatStart', async () => {
  const parent = await handshake;
  parent.emit('readyToChatStart');
});