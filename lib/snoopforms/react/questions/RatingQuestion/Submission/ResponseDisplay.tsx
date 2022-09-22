import { RatingQuestionSubmissionData } from "../types";
//for reponses
export default function ResponseDisplay({ data }: { data: RatingQuestionSubmissionData }) {
  const ratings = data.ratings;
  return <div className="response-display-ratingQuestion">{ratings > 0 ? ratings : <i>No Answer</i>}</div>;
}
