import { SummaryDisplayProps } from "../../factories/summary";
import BaseSummaryDisplay from "../../toolkit/base/BaseSummaryDisplay";

//for summary
export default function SummaryDisplay(props: SummaryDisplayProps) {
  const { questionId, questionType, questionConfig, submissionResults, questionTitle } = props;
  console.log("RENDER SummaryDisplay", questionType, questionTitle);
  const answers: string[] = submissionResults;
  return (
    <BaseSummaryDisplay questionTitle={questionTitle || questionId} questionType={questionType}>
      <div className="flow-root px-8 my-4 mt-6 text-center" style={{ margin: "24px 0 16px", padding: "0 32px" }}>
        {answers.map((answer, i) => (
          <div
            key={i}
            style={{
              padding: "16px 0",
              color: "#405164",
              lineHeight: "20px",
              fontSize: "14px",
              borderBottom: i === answers.length - 1 ? "" : "1px solid #d2dae2",
            }}
          >
            {answer}
          </div>
        ))}
      </div>
    </BaseSummaryDisplay>
  );
}
