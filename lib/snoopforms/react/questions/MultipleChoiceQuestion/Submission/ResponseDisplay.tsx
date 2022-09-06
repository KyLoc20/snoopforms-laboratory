import { MultipleChoiceQuestionSubmissionData } from "../types";
//for reponses
export default function ResponseDisplay({ data }: { data: MultipleChoiceQuestionSubmissionData }) {
  return <span>{data.content}</span>;
}
