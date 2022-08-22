import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import BaseResults from "./BaseResults";
import { Summary } from "./BaseResults";
export default function ChoiceResults({ element }: { element: Summary }) {
  console.log("ChoiceResults", element);
  const _options = element.result as { key: string; value: number }[];
  const data = {
    //labels: element.data.options,
    labels: _options.map((o) => o.key),
    datasets: [
      {
        //data: getDataset(element, elementAnswers),
        data: _options.map((o) => o.value || 0),
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
