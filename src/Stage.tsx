import { Stage as BaseStage, StageProps } from '@chub-ai/stages-ts';
import React from 'react';

export class Stage extends BaseStage {
  // Глобальное состояние stage (сохраняется между сообщениями)
  private messageCount: number = 0;

  // Инициализация (вызывается один раз при загрузке)
  initialize = async (props: StageProps) => {
    console.log('Stage initialized');
  };

  // Перед отправкой промпта в LLM
  beforePrompt = async (props: StageProps) => {
    return {
      systemMessages: [],
      messageState: { count: this.messageCount },
    };
  };

  // После получения ответа от LLM
  afterResponse = async (props: StageProps) => {
    this.messageCount += 1;

    return {
      systemMessages: [`Счётчик сообщений: ${this.messageCount}`],
      messageState: { count: this.messageCount },
    };
  };

  // Рендер UI — основной вид stage
  render = (props: StageProps) => {
    const { messages, messageState } = props;
    const lastMessage = messages[messages.length - 1]?.content || 'Нет сообщений';
    const count = messageState?.count ?? 0;

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