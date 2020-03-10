import Postmate from 'postmate';
import { publish, subscribe } from '../pubSub';
import { start } from '../conversation';
import { setting } from '../dataStore';

export const handshake = new Postmate.Model({
  publishMessage: ([topic, message]) => publish(topic, message),
  startChat: () => start('hello')
});

(async () => {
  const parent = await handshake;
  const { setting: fromParent } = parent.model;

  Object.keys(fromParent).forEach(key => {
    setting[key] = fromParent[key];
  });

  subscribe('getGAClientId', (data) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ parentGAClientId: data });
  });
  parent.emit('getGAClientId');
})();