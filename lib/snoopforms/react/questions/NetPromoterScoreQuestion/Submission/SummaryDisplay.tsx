import { SummaryDisplayProps } from "../../factories/summary";
import BaseSummaryDisplay from "../../toolkit/base/BaseSummaryDisplay";
import { NetPromoterScoreQuestionChartData } from "./SummaryAnalyzer";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
//for summary
export default function SummaryDisplay(props: SummaryDisplayProps) {
  const { questionId, questionType, questionConfig, submissionResults, questionTitle } = props;
  const chartData: NetPromoterScoreQuestionChartData = submissionResults;

  const options = initChartOptions() as any;
  const data = {
    labels: Object.keys(chartData),
    datasets: [
      {
        data: Object.entries(chartData).map(([k, o]) => o),
        backgroundColor: ["rgba(245, 59, 87, 0.7)"],
        borderColor: ["rgba(245, 59, 87, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <BaseSummaryDisplay questionTitle={questionTitle || questionId} questionType={questionType}>
      <div className="flow-root px-8 my-4 mt-6 text-center" style={{ margin: "24px 0 16px", padding: "0 32px" }}>
        <Chart type="bar" data={data} options={options} height={75} />
      </div>
    </BaseSummaryDisplay>
  );
}
const initChartOptions = () => ({
  indexAxis: "y",
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    yAxis: [
      {
        ticks: {
          min: 1,
          precision: 0,
        },
      },
    ],
  },
});
