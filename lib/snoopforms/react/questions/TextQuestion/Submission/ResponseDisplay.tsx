import { TextQuestionSubmissionData } from "../types";
//for reponses
export default function ResponseDisplay({ data }: { data: TextQuestionSubmissionData }) {
  return <span>{data.content}</span>;
}
