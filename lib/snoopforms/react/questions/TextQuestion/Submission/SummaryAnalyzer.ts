import { TextQuestionConfigData } from "../types";
export default function SummaryAnalyzer(config: TextQuestionConfigData, details: { content: string }[]) {
  return details.map((item) => item.content);
}
