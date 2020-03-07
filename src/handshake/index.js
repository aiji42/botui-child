import Postmate from 'postmate';
import { publish, subscribe } from '../pubSub';
import { setting } from '../dataStore';
import { start } from '../conversation';
import { findStoredValue, saveStoreValue } from '../dataStore';

export const handshake = new Postmate.Model({
  setting: (data) => {
    Object.keys(data).forEach(key => {
      setting[key] = data[key];
      publish(`setting.${key}`);
    });
    publish('activate', data);
  },
  publishMessage: ([topic, message]) => publish(topic, message),
  startChat: () => start('hello')
});

subscribe('activate', async ({ activateRate }) => {
  window.dataLayer = window.dataLayer || [];
  const activeate = shouldStartChat(activateRate);
  window.dataLayer.push({ event: 'analytics', eventCategory: 'botui-child', eventAction: 'activate', eventLabel: activeate ? 'true' : 'false' });
  const parent = await handshake;
  activeate ? parent.emit('readyToStartChat') : parent.emit('doNotStartChat');
});

const shouldStartChat = (rate) => {
  if (typeof rate !== 'number') return true;
  return saveStoreValue('activeate', findStoredValue('activeate', Math.random() <= rate));
};