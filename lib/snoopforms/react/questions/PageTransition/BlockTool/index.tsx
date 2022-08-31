import { API, BlockTool, BlockToolData, ToolConfig } from "../../toolkit/types/editorjs";
import BuilderComponent from "../BuilderComponent";
import { PageTransitionConfigData } from "../types";
import ReactDOM from "react-dom";
interface PageTransitionData extends BlockToolData {
  label: string;
  placeholder: string;
  required: boolean;
}
//extends RatingComponentConfigData
interface PageTransitionData {
  questionId?: string; //not for PageTransition
  _component: PageTransitionConfigData;
}
export default class RatingQuestion implements BlockTool {
  rootNode: undefined | HTMLElement;
  api: API;
  data: PageTransitionData;
  constructor({ data, api }: { api: API; config?: ToolConfig; data?: PageTransitionData }) {
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
      title: "New Page",
      icon: `<svg viewBox="0 0 20 20" fill="currentColor" >
      <path fill-rule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zM10 8a.75.75 0 01.75.75v1.5h1.5a.75.75 0 010 1.5h-1.5v1.5a.75.75 0 01-1.5 0v-1.5h-1.5a.75.75 0 010-1.5h1.5v-1.5A.75.75 0 0110 8z" clip-rule="evenodd" />
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
    const handleDataChange = (data: PageTransitionConfigData) => {
      this.data._component = data;
    };
    ReactDOM.render(<BuilderComponent onDataChange={handleDataChange} initialData={this.data._component} />, this.rootNode);
    return this.rootNode;
  }
}
const DEFAULT_DATA: PageTransitionConfigData = {
  submitLabel: "Submit",
};
