import { API, BlockTool, BlockToolData, ToolConfig } from "../../toolkit/types/editorjs";
import BuilderComponent from "../BuilderComponent";
import { RatingQuestionConfigData } from "../types";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
interface RatingQuestionData extends BlockToolData {
  label: string;
  placeholder: string;
  required: boolean;
}
//extends RatingComponentConfigData
interface RatingQuestionData {
  questionId?: string;
  _component: RatingQuestionConfigData;
}
export default class RatingQuestion implements BlockTool {
  rootNode: undefined | HTMLElement;
  api: API;
  data: RatingQuestionData;
  constructor({ data, api }: { api: API; config?: ToolConfig; data?: RatingQuestionData }) {
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
      title: "Rating Question",
      icon: `<svg viewBox="0 0 20 20" fill="currentColor">
      <path
        fill-rule="evenodd"
        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
        clip-rule="evenodd"
      />
    </svg>
    `,
    };
  }
  save(block: HTMLElement) {
    return this.data;
  }
  render(): HTMLElement {
    //what if init this.wrapper in the constructor
    this.rootNode = document.createElement("div");
    this.rootNode.classList.add("block-root");
    const handleDataChange = (data: RatingQuestionConfigData) => {
      this.data._component = data;
    };
    const root = createRoot(this.rootNode); // createRoot(container!) if you use TypeScript
    root.render(<BuilderComponent onDataChange={handleDataChange} initialData={this.data._component} />);
    // ReactDOM.render(<BuilderComponent onDataChange={handleDataChange} initialData={this.data._component} />, this.rootNode);
    return this.rootNode;
  }
}
const DEFAULT_DATA: RatingQuestionConfigData = {
  title: "Your Question",
  num: 5,
  icon: "stars",
  isRequired: false,
};
