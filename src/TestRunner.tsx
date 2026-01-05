import { MyStage } from "./Stage";  // <-- Замените MyStage на точное имя вашего класса из Stage.tsx!
import { useEffect, useState } from "react";
import { DEFAULT_INITIAL, StageBase, InitialData } from "@chub-ai/stages-ts";

// Modify this JSON to include whatever character/user information you want to test.
import InitData from './assets/test-init.json';

export interface TestStageRunnerProps<
  StageType extends StageBase<InitStateType, ChatStateType, MessageStateType, ConfigType>,
  InitStateType = unknown,
  ChatStateType = unknown,
  MessageStateType = unknown,
  ConfigType = unknown
> {
  factory: () => StageType;  // <-- Изменено: теперь без аргумента data
}

export const TestStageRunner = <
  StageType extends StageBase<InitStateType, ChatStateType, MessageStateType, ConfigType>,
  InitStateType = unknown,
  ChatStateType = unknown,
  MessageStateType = unknown,
  ConfigType = unknown
>({ factory }: TestStageRunnerProps<StageType, InitStateType, ChatStateType, MessageStateType, ConfigType>) => {
  const [stage, setStage] = useState<StageType | null>(null);

  const [node, setNode] = useState(new Date());

  function refresh() {
    setNode(new Date());
  }

  useEffect(() => {
    // Создаём stage без аргументов (новый API)
    const newStage = factory();
    setStage(newStage);

    // Имитируем load (initialize)
    newStage.initialize({} as any).then(() => {
      console.info("Test Stage initialized");
      runTests(newStage);
    });
  }, [factory]);

  async function runTests(stage: StageType) {
    // Здесь вы можете добавить свои тесты, как в оригинале
    console.info("Running tests...");
    // Пример теста:
    // await stage.afterResponse({ ... } as any);
    // refresh();
  }

  if (!stage) {
    return <div>Stage loading...</div>;
  }

  // render теперь вызывается без аргументов в новом API, но для теста передадим mock-props
  return (
    <>
      <div style={{ display: 'none' }}>{String(node)}</div>
      {stage.render({
        messages: [],
        messageState: {},
        chatState: {},
        config: {},
      } as any)}
    </>
  );
};