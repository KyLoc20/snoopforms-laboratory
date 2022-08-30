import { default as TextQuestionBuilder } from "./BuilderComponent";
import { default as TextQuestion } from "./UserComponent";
import { default as TextBlockTool } from "./BlockTool";
// import {
//   ResponseDisplay as TextQuestionResponseDisplay,
//   SummaryDisplay as TextQuestionSummaryDisplay,
//   SummaryAnalyzer as TextQuestionSummaryAnalyzer,
// } from "./Submission";
import { TextQuestionConfigData, TextQuestionSubmissionData } from "./types";
export { TextQuestionBuilder, TextBlockTool };
export type { TextQuestionSubmissionData, TextQuestionConfigData };
export default TextQuestion;
