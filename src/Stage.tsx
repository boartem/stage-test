import { StageBase, StageProps } from '@chub-ai/stages-ts';
import React from 'react';

export class Stage extends StageBase {
  // Глобальное состояние (chat state)
  private messageCount: number = 0;

  initialize = async (props: StageProps) => {
    console.log('Stage initialized');
    // Можно вернуть initState, если нужно
    return {};
  };

  beforePrompt = async (props: StageProps) => {
    return {
      systemMessages: [],
      messageState: { count: this.messageCount },
    };
  };

  afterResponse = async (props: StageProps) => {
    this.messageCount += 1;

    return {
      systemMessages: [`Счётчик сообщений: ${this.messageCount}`],
      messageState: { count: this.messageCount },
    };
  };

  render = (props: StageProps) => {
    const { messages, messageState } = props;
    const lastMessage = messages[messages.length - 1]?.content || 'Нет сообщений';
    const count = (messageState as { count?: number } )?.count ?? 0;

    return (
      <div className="simple-stage">
        <h3>Простой Stage</h3>
        <p>Последнее сообщение:</p>
        <blockquote>{lastMessage}</blockquote>
        <p>Всего сообщений: {count}</p>
      </div>
    );
  };
}