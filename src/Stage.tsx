import { Stage, StageProps } from '@chub-ai/stages-ts';
import React from 'react';

export class Stage extends Stage {
  private messageCount: number = 0;

  initialize = async (props: StageProps) => {
    console.log('Stage initialized');
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
    const count = (messageState as { count?: number })?.count ?? 0;

    return (
      <div style={{ padding: '16px', background: '#f0f0f0', borderRadius: '8px', fontFamily: 'sans-serif' }}>
        <h3>Простой Stage</h3>
        <p>Последнее сообщение:</p>
        <blockquote style={{ background: 'white', padding: '8px', borderLeft: '4px solid #ccc', margin: '8px 0' }}>
          {lastMessage}
        </blockquote>
        <p>Всего сообщений: {count}</p>
      </div>
    );
  };
}