import { RatingQuestionSubmissionData } from "../UserComponent";

type RatingQuestionSummaryData = {
  title: string; //questionTitle
  options: { [ratingsAsKey: string]: number }; //{ "1": 12 } means there are 12 submissions selecting ratings of "1"
};
//for reponses
function ResponseDisplay({ data }: { data: RatingQuestionSubmissionData }) {
  return <span>{data.ratings}</span>;
}
//for summary
function SummaryDisplay({ dataList }: { dataList: RatingQuestionSubmissionData[] }) {
  return <div>SummaryDisplay</div>;
}

export { ResponseDisplay, SummaryDisplay };
export type { RatingQuestionSummaryData };
