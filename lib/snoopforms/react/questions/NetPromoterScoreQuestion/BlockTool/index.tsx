import { API, BlockTool, BlockToolData, ToolConfig } from "../../toolkit/types/editorjs";
import BuilderComponent from "../BuilderComponent";
import { NetPromoterScoreQuestionConfigData } from "../types";
import { createRoot } from "react-dom/client";
interface NetPromoterScoreQuestionData extends BlockToolData {
  questionId?: string;
  _component: NetPromoterScoreQuestionConfigData;
}
export default class NetPromoterScoreQuestion implements BlockTool {
  rootNode: undefined | HTMLElement;
  api: API;
  data: NetPromoterScoreQuestionData;
  constructor({ data, api }: { api: API; config?: ToolConfig; data?: NetPromoterScoreQuestionData }) {
    this.rootNode = undefined;
    this.api = api;
    this.data = {
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
      title: "NPS Question",
      //face-smile
      icon: `<svg viewBox="0 0 24 24" class="outlined" stroke-width="1.5" stroke="currentColor"  >
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
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
    const handleDataChange = (data: NetPromoterScoreQuestionConfigData) => {
      this.data._component = data;
    };
    const root = createRoot(this.rootNode); // createRoot(container!) if you use TypeScript
    root.render(<BuilderComponent onDataChange={handleDataChange} initialData={this.data._component} />);
    // ReactDOM.render(<BuilderComponent onDataChange={handleDataChange} initialData={this.data._component} />, this.rootNode);
    return this.rootNode;
  }
}
const DEFAULT_DATA: NetPromoterScoreQuestionConfigData = {
  title: "How likely are you to recommend ... to a friend or colleague?",
  isRequired: false,
  bestText: "Extremely likely",
  worstText: "Not at all likely",
};
