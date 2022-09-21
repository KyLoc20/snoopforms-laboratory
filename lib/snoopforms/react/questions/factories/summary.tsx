import { RatingQuestionSummaryDisplay, RatingQuestionSummaryAnalyzer } from "../RatingQuestion";
import { TextQuestionSummaryDisplay, TextQuestionSummaryAnalyzer } from "../TextQuestion";
import { EmailQuestionSummaryDisplay, EmailQuestionSummaryAnalyzer } from "../EmailQuestion";
import { MultipleChoiceQuestionSummaryDisplay, MultipleChoiceQuestionSummaryAnalyzer } from "../MultipleChoiceQuestion";
import { NetPromoterScoreQuestionSummaryDisplay, NetPromoterScoreQuestionSummaryAnalyzer } from "../NetPromoterScoreQuestion";
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
/**
 * @QUESTION_SETTING
 */
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
    case "emailQuestion":
      render = function _(props) {
        return <EmailQuestionSummaryDisplay {...props} />;
      };
      break;
    case "multipleChoiceQuestion":
      render = function _(props) {
        return <MultipleChoiceQuestionSummaryDisplay {...props} />;
      };
      break;
    case "netPromoterScoreQuestion":
      render = function _(props) {
        return <NetPromoterScoreQuestionSummaryDisplay {...props} />;
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
/**
 * @QUESTION_SETTING
 */
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
    case "emailQuestion":
      // ["string1", "string2"]
      analyzer = EmailQuestionSummaryAnalyzer;
      break;
    case "multipleChoiceQuestion":
      analyzer = MultipleChoiceQuestionSummaryAnalyzer;
      break;
    case "netPromoterScore":
      analyzer = NetPromoterScoreQuestionSummaryAnalyzer;
      break;
    default:
      analyzer = RatingQuestionSummaryAnalyzer;
      break;
  }
  return analyzer;
}
