import { RatingQuestionSubmissionData } from "../UserComponent";
//for reponses
function ResponseDisplay({ data }: { data: RatingQuestionSubmissionData }) {
  return <span>{data.ratings}</span>;
}
//for summary
function SummaryDisplay({ dataList }: { dataList: RatingQuestionSubmissionData[] }) {
  return <div>SummaryDisplay</div>;
}
export { ResponseDisplay, SummaryDisplay };
