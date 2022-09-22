import { NetPromoterScoreQuestionSubmissionData } from "../types";
//for reponses
export default function ResponseDisplay({ data }: { data: NetPromoterScoreQuestionSubmissionData }) {
  const score = data.score;
  return <div className="response-display-netPromoterScoreQuestion">{score >= 0 ? score : <i>No Answer</i>}</div>;
}
