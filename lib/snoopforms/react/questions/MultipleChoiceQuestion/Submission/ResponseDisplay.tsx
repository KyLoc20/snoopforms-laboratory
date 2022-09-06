import { MultipleChoiceQuestionSubmissionData } from "../types";
//for reponses
export default function ResponseDisplay({ data }: { data: MultipleChoiceQuestionSubmissionData }) {
  const choiceList = data.choiceList;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", padding: "12px 0" }}>
      {choiceList.map((choice, i) => (
        <div
          key={i}
          style={{
            marginRight: "8px",
            borderRadius: "6px",
            padding: "4px 8px",
            background: "rgba(245,59,87,0.6)",
            color: "white",
            lineHeight: "20px",
            fontWeight: 500,
          }}
        >
          {choice.label}
        </div>
      ))}
    </div>
  );
}
