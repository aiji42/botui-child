import React from 'react';
import ReactDOM from 'react-dom';
import { conversation, progress, findNext as findNextConversation } from '.';
import { publish } from '../PubSub';

const icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=';

class Chat {
  constructor() {
    this.relayMessageId = null;
  }

  set botui(botui) { this._botui = botui; }

  get botui() { return this._botui; }

  async sayBot(options) {
    await this.relayStop();
    const defaults = {
      delay: 300,
      loading: true,
      photo: icon,
      content: 'massage is undefind.',
    };
    this.currentMessageId = await this.botui.message.bot({ ...defaults, ...options });
  }

  async sayBotWithComponent(options) {
    const { content: Content, id, ...option } = options;
    await this.sayBot({
      loading: false, photo: false, type: 'html', cssClass: 'no-background', ...option,
    });
    await new Promise(resolve => {
      let resolvedCount = 0;
      const messageId = this.currentMessageId;
      const resolver = () => {
        resolvedCount < 1 ? resolve() : this.rollback(messageId, id);
        resolvedCount += 1;
      };
      ReactDOM.render(<Content chatResolver={resolver.bind(this)} />, Array.from(document.querySelectorAll('.botui-message')).slice(-1)[0].querySelector('span'));
      this.scroll();
    });
  }

  async sayHuman(options) {
    await this.relayStop();
    const defaults = {
      delay: 400,
      content: 'massage is undefind.',
    };
    this.currentMessageId = await this.botui.message.human({ ...defaults, ...options });
  }

  async sayHumanWithComponent(options) {
    const { content: Content, id, ...option } = options;
    await this.sayHuman({ type: 'html', ...option });
    await new Promise(resolve => {
      let resolvedCount = 0;
      const messageId = this.currentMessageId;
      const resolver = () => {
        resolvedCount < 1 ? resolve() : this.rollback(messageId, id);
        resolvedCount += 1;
      };
      ReactDOM.render(<Content chatResolver={resolver.bind(this)} />, Array.from(document.querySelectorAll('.botui-message')).slice(-1)[0].querySelector('span'));
      this.scroll();
    });
  }

  async rollback(rollbackPointId, conversationId) {
    await this.reset(rollbackPointId);
    const { id } = findNextConversation({ id: conversationId });
    publish('progressPercentage', progress({id}));
    conversation(id);
  }

  async relay() {
    if (this.relayMessageId === null) {
      this.relayMessageId = await this.botui.message.bot({ loading: true, photo: icon });
      this.currentMessageId = this.relayMessageId;
    }
  }

  async relayStop() {
    if (this.relayMessageId !== null) {
      await this.botui.message.remove(this.relayMessageId);
      this.currentMessageId -= 1;
      this.relayMessageId = null;
    }
  }

  async reset(startPoint = 0) {
    await Promise.all(
      Array(this.currentMessageId).fill().map((_, k) => k + startPoint + 1).reverse()
        .map((id) => this.botui.message.remove(id)),
    );
    this.currentMessageId = startPoint;
  }

  scroll() {
    const index = this.currentMessageId - 1;
    const bounds = Array.from(document.querySelectorAll('.botui-message'))[index]
      .getBoundingClientRect();
    const y = bounds.top + document.documentElement.scrollTop
      - document.documentElement.clientTop - 60;
    window.scrollTo(0, y);
  }
}

const chat = new Chat();

export default chat;
