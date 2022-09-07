import { API, BlockTool, BlockToolData, ToolConfig } from "../../toolkit/types/editorjs";
import BuilderComponent from "../BuilderComponent";
import { EmailQuestionConfigData } from "../types";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
interface TextQuestionData extends BlockToolData {
  label: string;
  placeholder: string;
  required: boolean;
}
interface TextQuestionData {
  questionId?: string;
  _component: EmailQuestionConfigData;
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
      title: "Email Question",
      icon: `<svg viewBox="0 0 20 20" fill="currentColor" >
      <path fill-rule="evenodd" d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" clip-rule="evenodd" />
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
    const handleDataChange = (data: EmailQuestionConfigData) => {
      this.data._component = data;
    };
    const root = createRoot(this.rootNode); // createRoot(container!) if you use TypeScript
    root.render(<BuilderComponent onDataChange={handleDataChange} initialData={this.data._component} />);
    // ReactDOM.render(<BuilderComponent onDataChange={handleDataChange} initialData={this.data._component} />, this.rootNode);
    return this.rootNode;
  }
}
const DEFAULT_DATA: EmailQuestionConfigData = {
  title: "Your Question",
  placeholder: "Type Placeholder Here",
  isRequired: false,
};
