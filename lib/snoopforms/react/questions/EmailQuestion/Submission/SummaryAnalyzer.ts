import { EmailQuestionConfigData } from "../types";
export default function SummaryAnalyzer(config: EmailQuestionConfigData, details: { content: string }[]) {
  return details.map((item) => item.content);
}
