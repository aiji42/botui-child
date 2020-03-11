import React, { useEffect } from 'react';
import BotUI from 'botui';
import { setBotui } from '../../chat';
import handshake from '../../handshake';

const chatBotDomId = 'botui-app';

const ChatField = () => {
  useEffect(() => {
    setBotui(BotUI(chatBotDomId));
    const readyToStartChat = async () => {
      const parent = await handshake;
      parent.emit('readyToStartChat');
    };
    readyToStartChat();
  }, []);

  return (
    <div id={chatBotDomId}>
      <bot-ui></bot-ui>
    </div>
  );
};

export default ChatField;