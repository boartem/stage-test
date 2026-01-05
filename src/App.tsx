import React from 'react';
import { Stage, StageProps } from '@chub-ai/stages-ts';
import './App.css';

class MySimpleStage extends Stage {
  // Глобальное состояние (сохраняется между сообщениями)
  private messageCount: number = 0;

  // Инициализация stage
  initialize = async (props: StageProps) => {
    // Здесь можно загрузить конфиг или инициализировать данные
    console.log('Stage initialized');
  };

  // Перед отправкой промпта в LLM
  beforePrompt = async (props: StageProps) => {
    return {
      // Можно модифицировать промпт или добавить system messages
      systemMessages: [],
      messageState: { count: this.messageCount },
    };
  };

  // После получения ответа от LLM
  afterResponse = async (props: StageProps) => {
    this.messageCount += 1; // Увеличиваем счётчик

    return {
      systemMessages: [`Счётчик сообщений: ${this.messageCount}`],
      messageState: { count: this.messageCount },
    };
  };

  // Рендер UI (вызывается часто)
  render = (props: StageProps) => {
    const { messages, messageState } = props;
    const lastMessage = messages[messages.length - 1]?.content || 'Нет сообщений';
    const count = messageState?.count || 0;

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

export default function App() {
  return <MySimpleStage />;
}
