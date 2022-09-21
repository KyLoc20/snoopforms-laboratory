import { NetPromoterScoreQuestionConfigData } from "../types";
export type NetPromoterScoreQuestionChartData = {
  Detractors: number;
  Passives: number;
  Promoters: number;
};
export default function SummaryAnalyzer(config: NetPromoterScoreQuestionConfigData, details: { score: number }[]) {
  /**
   * score === -1: null
   * score >= 0 && score <= 6: "Detractors"
   * score >= 7 && score <= 8: "Passives"
   * score >= 9 && score <= 10: "Promoters"
   */
  const optionsForChart: NetPromoterScoreQuestionChartData = {
    Detractors: 0,
    Passives: 0,
    Promoters: 0,
  };
  details.forEach(({ score }) => {
    if (score >= 0 && score <= 6) optionsForChart.Detractors += 1;
    if (score >= 7 && score <= 8) optionsForChart.Passives += 1;
    if (score >= 9 && score <= 10) optionsForChart.Promoters += 1;
  });
  return optionsForChart;
}
