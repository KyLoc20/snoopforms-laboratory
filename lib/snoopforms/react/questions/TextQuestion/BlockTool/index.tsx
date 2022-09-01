import { API, BlockTool, BlockToolData, ToolConfig } from "../../toolkit/types/editorjs";
import BuilderComponent from "../BuilderComponent";
import { TextQuestionConfigData } from "../types";
import ReactDOM from "react-dom";
interface TextQuestionData extends BlockToolData {
  label: string;
  placeholder: string;
  required: boolean;
}
interface TextQuestionData {
  questionId?: string;
  _component: TextQuestionConfigData;
}
export default class TextQuestion implements BlockTool {
  rootNode: undefined | HTMLElement;
  api: API;
  data: TextQuestionData;
  constructor({ data, api }: { api: API; config?: ToolConfig; data?: TextQuestionData }) {
    this.rootNode = undefined;
    this.api = api;
    this.data = {
      label: data?.label ?? "",
      placeholder: data?.placeholder ?? "",
      required: data?.required ?? true,
      questionId: data?.questionId,
      //DEFAULT_DATA as initialData
      _component: {
        ...DEFAULT_DATA,
        ...data?._component,
      },
    };
  }
  static get toolbox() {
    return {
      title: "Text Question",
      icon: `<svg viewBox="0 0 20 20" fill="currentColor" >
      <path fill-rule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 001.33 0l1.713-3.293a.783.783 0 01.642-.413 41.102 41.102 0 003.55-.414c1.437-.231 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zM6.75 6a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 2.5a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" clip-rule="evenodd" />
    </svg>`,
    };
  }
  save(block: HTMLElement) {
    return this.data;
  }
  render(): HTMLElement {
    //what if init this.wrapper in the constructor
    this.rootNode = document.createElement("div");
    this.rootNode.classList.add("block-root");
    const handleDataChange = (data: TextQuestionConfigData) => {
      this.data._component = data;
    };
    ReactDOM.render(<BuilderComponent onDataChange={handleDataChange} initialData={this.data._component} />, this.rootNode);
    return this.rootNode;
  }
}
const DEFAULT_DATA: TextQuestionConfigData = {
  title: "",
  placeholder: "",
  isRequired: false,
};
