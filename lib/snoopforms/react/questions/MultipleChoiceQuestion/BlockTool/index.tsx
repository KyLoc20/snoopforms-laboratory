import { API, BlockTool, BlockToolData, ToolConfig } from "../../toolkit/types/editorjs";
import BuilderComponent from "../BuilderComponent";
import { MultipleChoiceQuestionConfigData } from "../types";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
interface MultipleChoiceQuestionData extends BlockToolData {
  label: string;
  placeholder: string;
  required: boolean;
}
interface MultipleChoiceQuestionData {
  questionId?: string;
  _component: MultipleChoiceQuestionConfigData;
}
export default class MultipleChoiceQuestion implements BlockTool {
  rootNode: undefined | HTMLElement;
  api: API;
  data: MultipleChoiceQuestionData;
  constructor({ data, api }: { api: API; config?: ToolConfig; data?: MultipleChoiceQuestionData }) {
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
      title: "MultipleChoice Question",
      icon: `<svg  viewBox="0 0 20 20" fill="currentColor" >
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
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
    const handleDataChange = (data: MultipleChoiceQuestionConfigData) => {
      this.data._component = data;
      console.log("UPDATE BLOCK", this.data._component);
    };
    const root = createRoot(this.rootNode); // createRoot(container!) if you use TypeScript
    root.render(<BuilderComponent onDataChange={handleDataChange} initialData={this.data._component} />);
    // ReactDOM.render(<BuilderComponent onDataChange={handleDataChange} initialData={this.data._component} />, this.rootNode);
    return this.rootNode;
  }
}
const DEFAULT_DATA: MultipleChoiceQuestionConfigData = {
  title: "Your Question",
  isRequired: false,
  onlyOne: true,
  options: [],
};
