import { RatingQuestionConfigData } from "../BuilderComponent";
export default function SummaryAnalyzer(config: RatingQuestionConfigData, details: { ratings: number }[]) {
  const options: { [ratingsAsKey: string]: number } = {};
  for (let i = 0; i <= config.num; i++) {
    options[i.toString()] = 0;
  }
  details.forEach((detail) => {
    const k = detail.ratings.toString();
    options[k] = options[k] ? options[k] + 1 : 1;
  });
  return options;
}
