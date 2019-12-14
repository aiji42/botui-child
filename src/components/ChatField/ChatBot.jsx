import React, { useEffect } from 'react';
import BotUI from 'botui';
import Chat from '../../conversation/Chat';

const chatBotDomId = 'botui-app';

const ChatField = () => {
  useEffect(() => {
    Chat.botui = BotUI(chatBotDomId);
  }, []);

  return (
    <div id={chatBotDomId}>
      <bot-ui></bot-ui>
    </div>
  );
};

export default ChatField;