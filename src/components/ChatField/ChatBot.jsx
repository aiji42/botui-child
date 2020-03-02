import React, { useEffect } from 'react';
import BotUI from 'botui';
import { setBotui } from '../../chat';

const chatBotDomId = 'botui-app';

const ChatField = () => {
  useEffect(() => {
    setBotui(BotUI(chatBotDomId));
  }, []);

  return (
    <div id={chatBotDomId}>
      <bot-ui></bot-ui>
    </div>
  );
};

export default ChatField;