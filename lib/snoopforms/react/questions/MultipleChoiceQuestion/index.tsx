import { default as MultipleChoiceQuestionBuilder } from "./BuilderComponent";
import { default as MultipleChoiceQuestion } from "./UserComponent";
import { default as MultipleChoiceQuestionBlockTool } from "./BlockTool";
import {
  ResponseDisplay as MultipleChoiceQuestionResponseDisplay,
  SummaryDisplay as MultipleChoiceQuestionSummaryDisplay,
  SummaryAnalyzer as MultipleChoiceQuestionSummaryAnalyzer,
} from "./Submission";
import { MultipleChoiceQuestionConfigData, MultipleChoiceQuestionSubmissionData } from "./types";
export {
  MultipleChoiceQuestionBuilder,
  MultipleChoiceQuestion,
  MultipleChoiceQuestionBlockTool,
  MultipleChoiceQuestionResponseDisplay,
  MultipleChoiceQuestionSummaryDisplay,
  MultipleChoiceQuestionSummaryAnalyzer,
};
export type { MultipleChoiceQuestionSubmissionData, MultipleChoiceQuestionConfigData };
export default MultipleChoiceQuestion;
