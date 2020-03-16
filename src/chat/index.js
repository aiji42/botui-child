import React from 'react';
import ReactDOM from 'react-dom';
import { scroller } from 'react-scroll';

const icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=';

const chat = { botui: null, currentMessageIndex: null, relayMessageIndex: null };

export const setBotui = (bot) => chat.botui = bot;

const defaultOptionBot = {
  delay: 300,
  loading: true,
  photo: icon,
  content: 'massage is undefind.',
};

const defaultOptionHuman = {
  delay: 400,
  content: 'massage is undefind.',
};

const currentMessageDOM = () => document.querySelector('.botui-message:last-child');

const prevMessageDOM = () => document.querySelector('.botui-message:nth-last-child(2)');

export const relay = async () => {
  if (chat.relayMessageIndex !== null) return;
  chat.relayMessageIndex = await chat.botui.message.bot({ loading: true, photo: icon });
  chat.currentMessageIndex = chat.relayMessageIndex;
};

const stopRelay = async () => {
  if (chat.relayMessageIndex === null) return;
  await chat.botui.message.remove(chat.relayMessageIndex);
  chat.currentMessageIndex -= 1;
  chat.relayMessageIndex = null;
};

const resetMessage = async (rootIndex = 0) => {
  let id = chat.currentMessageIndex;
  while (id > rootIndex) {
    await chat.botui.message.remove(id);
    id -= 1;
  }
  chat.currentMessageIndex = rootIndex;
};

const rollbacker = (rootIndex, callback) => async () => {
  await resetMessage(rootIndex);
  callback();
};

export const sayBot = async (option) => {
  await stopRelay();
  chat.currentMessageIndex = await chat.botui.message.bot({ ...defaultOptionBot, ...option });
};

export const sayHuman = async (option) => {
  await stopRelay();
  chat.currentMessageIndex = await chat.botui.message.human({ ...defaultOptionHuman, ...option });
};

const resolveOrRollback = (resolve, rollback) => {
  let resolvedCount = 0;
  return () => {
    resolvedCount < 1 ? resolve() : rollback();
    resolvedCount += 1;
  };
};

const renderComponentOnMessage = async (Content, callbackWhenRollback) => {
  await new Promise(resolve => {
    const rollback = rollbacker(chat.currentMessageIndex, callbackWhenRollback);
    ReactDOM.render(<Content chatResolver={resolveOrRollback(resolve, rollback)} />, currentMessageDOM().querySelector('span'), () => {
      scroller.register('prevMessageDOM', prevMessageDOM());
      scroller.scrollTo('prevMessageDOM', {offset: -5, smooth: true, duration: 100});
      scroller.unregister('prevMessageDOM');
    });
  });
};

export const sayBotComponent = async (options) => {
  const { content, whenRollback, ...option } = options;
  await sayBot({ photo: false, type: 'html', ...option });
  await renderComponentOnMessage(content, whenRollback);
};

export const sayHumanComponent = async (options) => {
  const { content, whenRollback, ...option } = options;
  await sayHuman({ type: 'html', ...option });
  await renderComponentOnMessage(content, whenRollback);
};
