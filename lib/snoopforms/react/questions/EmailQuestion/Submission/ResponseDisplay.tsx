import { EmailQuestionSubmissionData } from "../types";
//for reponses
export default function ResponseDisplay({ data }: { data: EmailQuestionSubmissionData }) {
  const content = data.content;
  return <div className="response-display-emailQuestion">{Boolean(content) ? content : <i>No Answer</i>}</div>;
}
