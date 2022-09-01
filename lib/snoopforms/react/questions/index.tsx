import { createQuestionElement, PreSubmissionData, BlockDataForQuestion } from "./factories/element";
import { createResponseDisplay } from "./factories/response";
import { createSummaryDisplay, createSummaryAnalyzer } from "./factories/summary";
export { createQuestionElement, createResponseDisplay, createSummaryDisplay, createSummaryAnalyzer, isQuestionType };
export type { PreSubmissionData, BlockDataForQuestion };
const isQuestionType = (value: string) => ["ratingQuestion", "textQuestion"].includes(value);
