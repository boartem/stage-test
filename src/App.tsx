import {ReactRunner} from "@chub-ai/stages-ts";
import {MyStage} from "./Stage";
import {TestStageRunner} from "./TestRunner";

function App() {
  const isDev = import.meta.env.MODE === 'development';
  console.info(`Running in ${import.meta.env.MODE}`);

  return isDev ? <TestStageRunner factory={ (data: any) => new MyStage() }/> :
      <ReactRunner factory={(data: any) => new MyStage()} />;
}

export default App