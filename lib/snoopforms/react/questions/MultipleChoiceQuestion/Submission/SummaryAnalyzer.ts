import { MultipleChoiceQuestionConfigData } from "../types";
export default function SummaryAnalyzer(config: MultipleChoiceQuestionConfigData, details: { content: string }[]) {
  return details.map((item) => item.content);
}
