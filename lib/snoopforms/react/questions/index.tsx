import { createQuestionElement, PreSubmissionData } from "./factories/element";
import { createResponseDisplay } from "./factories/response";
import { createSummaryDisplay, createSummaryAnalyzer } from "./factories/summary";
export { createQuestionElement, createResponseDisplay, createSummaryDisplay, createSummaryAnalyzer, isQuestionType };
export type { PreSubmissionData };
const isQuestionType = (value: string) => ["ratingQuestion"].includes(value);
