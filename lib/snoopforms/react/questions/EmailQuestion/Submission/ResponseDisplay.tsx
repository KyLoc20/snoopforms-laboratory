import { EmailQuestionSubmissionData } from "../types";
//for reponses
export default function ResponseDisplay({ data }: { data: EmailQuestionSubmissionData }) {
  return <span>{data.content}</span>;
}
