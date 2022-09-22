import { TextQuestionSubmissionData } from "../types";
//for reponses
export default function ResponseDisplay({ data }: { data: TextQuestionSubmissionData }) {
  const content = data.content;
  return <div className="response-display-textQuestion">{Boolean(content) ? content : <i>No Answer</i>}</div>;
}
