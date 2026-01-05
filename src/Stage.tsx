import { StageBase, StageProps } from '@chub-ai/stages-ts';
import React from 'react';

export class SimpleStage extends StageBase {
  private messageCount: number = 0;

  load = async (props: StageProps) => {
    console.log('Stage load called');
    return { initState: {} };
  };

  initialize = async (props: StageProps) => {
    console.log('Stage initialized');
    return {};
  };
  
  setState = async (state: { count?: number }) => {
    if (state.count !== undefined) {
      this.messageCount = state.count;
    }
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

  render = (props: StageProps | undefined) => {
    if (!props) {
      return <div>Загрузка stage...</div>;
    }

    const { messages = [], messageState = {} } = props;

    const lastMessage = messages.length > 0 
      ? messages[messages.length - 1]?.content || 'Нет сообщений' 
      : 'Нет сообщений';

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