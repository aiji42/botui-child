import React from 'react';
import ReactDOM from 'react-dom';

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

const currentMessageDOM = () => Array.from(document.querySelectorAll('.botui-message'))[chat.currentMessageIndex];

const prevMessageDOM = () => Array.from(document.querySelectorAll('.botui-message'))[chat.currentMessageIndex - 1];

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
  await Promise.all(
    Array(chat.currentMessageIndex).fill()
      .map((_, k) => k + rootIndex + 1).reverse()
      .map((id) => chat.botui.message.remove(id)),
  );
  chat.currentMessageIndex = rootIndex;
};

const rollbacker = (rootIndex, callback) => async () => {
  await resetMessage(rootIndex);
  callback();
};

const scroll = () => {
  const bounds = prevMessageDOM().getBoundingClientRect();
  const y = bounds.top + document.documentElement.scrollTop
    - document.documentElement.clientTop - 60;
  window.scrollTo(0, y);
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
    ReactDOM.render(<Content chatResolver={resolveOrRollback(resolve, rollback)} />, currentMessageDOM().querySelector('span'));
    // scroll();
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
