import { RatingQuestionSummaryDisplay, RatingQuestionSummaryAnalyzer } from "../RatingQuestion";
import { TextQuestionSummaryDisplay, TextQuestionSummaryAnalyzer } from "../TextQuestion";
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
        return <RatingQuestionSummaryDisplay {...props} />;
      };
      break;
    case "textQuestion":
      render = function _(props) {
        return <TextQuestionSummaryDisplay {...props} />;
      };
      break;
    default:
      render = function _(props) {
        return <RatingQuestionSummaryDisplay {...props} />;
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
    case "textQuestion":
      // ["string1", "string2"]
      analyzer = TextQuestionSummaryAnalyzer;
      break;
    default:
      analyzer = RatingQuestionSummaryAnalyzer;
      break;
  }
  return analyzer;
}
