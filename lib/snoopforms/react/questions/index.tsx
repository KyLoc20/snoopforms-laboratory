import { createQuestionElement, PreSubmissionData, BlockDataForQuestion } from "./factories/element";
import { createResponseDisplay } from "./factories/response";
import { createSummaryDisplay, createSummaryAnalyzer } from "./factories/summary";
export { createQuestionElement, createResponseDisplay, createSummaryDisplay, createSummaryAnalyzer, isQuestionType };
export type { PreSubmissionData, BlockDataForQuestion };
/**
 * @QUESTION_SETTING
 */
const isQuestionType = (value: string) =>
  ["ratingQuestion", "multipleChoiceQuestion", "emailQuestion", "textQuestion", "netPromoterScoreQuestion"].includes(value);
