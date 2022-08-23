import { RatingQuestionSubmissionData } from "../UserComponent";
//for reponses
export default function ResponseDisplay({ data }: { data: RatingQuestionSubmissionData }) {
  return <span>{data.ratings}</span>;
}
