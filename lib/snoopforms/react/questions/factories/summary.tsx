import { RatingQuestionSummaryDisplay, RatingQuestionSummaryAnalyzer } from "@/lib/snoopforms/react/questions/RatingQuestion";
export { createSummaryDisplay, createSummaryAnalyzer };
export type { SummaryDisplayProps };
/**
 * defines how to write a SummaryDisplay Component
 */
type SummaryDisplayProps = {
  questionId: string;
  questionTitle: string; //from BuilderComponet
  questionType: string;
  questionConfig: any; //from BuilderComponet
  submissionResults: any; //from UserComponent
};
function createSummaryDisplay(type: string) {
  let render: React.FC<SummaryDisplayProps>;
  switch (type) {
    case "ratingQuestion":
      render = function _(props) {
        return <RatingQuestionSummaryDisplay {...props}></RatingQuestionSummaryDisplay>;
      };
      break;
    default:
      render = function _(props) {
        return <RatingQuestionSummaryDisplay {...props}></RatingQuestionSummaryDisplay>;
      };
      break;
  }
  return render;
}

function createSummaryAnalyzer(type: string): (config: any, details: any[]) => any {
  let analyzer: (config: any, details: any[]) => any;
  switch (type) {
    case "ratingQuestion":
      // { num: 10, icon: "hearts", isRequired: false, title: "How do you like this stuff?" }
      // [{ rating: 1 }, { rating: 2 }]
      analyzer = RatingQuestionSummaryAnalyzer;
      break;
    default:
      analyzer = RatingQuestionSummaryAnalyzer;
      break;
  }
  return analyzer;
}
