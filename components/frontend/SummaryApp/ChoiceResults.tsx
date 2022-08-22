import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import BaseResults from "./BaseResults";
import { QuestionSummary } from "@/lib/types";
import { RatingQuestionSummaryData } from "@/lib/snoopforms/react/questions/RatingQuestion";
export default function ChoiceResults({ element }: { element: QuestionSummary }) {
  console.log("RENDER ChoiceResults", element.questionId, element);
  const { title, options: _options } = element.submissionResults as RatingQuestionSummaryData;
  const data = {
    labels: Object.keys(_options),
    datasets: [
      {
        data: Object.entries(_options).map(([k, o]) => o),
        backgroundColor: ["rgba(245, 59, 87, 0.7)"],
        borderColor: ["rgba(245, 59, 87, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options: any = {
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
  };

  return (
    <BaseResults element={element}>
      <div className="flow-root px-8 my-4 mt-6 text-center">
        <Chart type="bar" data={data} options={options} height={75} />
      </div>
    </BaseResults>
  );
}
