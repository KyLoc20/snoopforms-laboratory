import { MultipleChoiceQuestionConfigData, ChoiceOption } from "../types";
export type MultipleChoiceQuestionChartData = { [labelAsKey: string]: number };
export default function SummaryAnalyzer(config: MultipleChoiceQuestionConfigData, details: { choiceList: ChoiceOption[] }[]) {
  const optionsForChart: MultipleChoiceQuestionChartData = {};
  config.options.forEach((option) => {
    optionsForChart[option.label] = 0;
  });
  details.forEach(({ choiceList }) => {
    choiceList.forEach((choice) => {
      const k = choice.label;
      optionsForChart[k] = optionsForChart[k] ? optionsForChart[k] + 1 : 1;
    });
  });
  return optionsForChart;
}
