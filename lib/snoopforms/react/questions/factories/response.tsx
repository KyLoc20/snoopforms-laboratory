import { RatingQuestionResponseDisplay } from "../RatingQuestion";
import { TextQuestionResponseDisplay } from "../TextQuestion";
import { EmailQuestionResponseDisplay } from "../EmailQuestion";
import { MultipleChoiceQuestionResponseDisplay } from "../MultipleChoiceQuestion";
import { NetPromoterScoreQuestionResponseDisplay } from "../NetPromoterScoreQuestion";
export { createResponseDisplay };
/**
 * @QUESTION_SETTING
 */
function createResponseDisplay(type: string, data: any) {
  let render: React.FC<{}>;
  if (!data) {
    render = function _() {
      return <UndefinedReminder />;
    };
  } else {
    switch (type) {
      case "ratingQuestion":
        render = function _() {
          return <RatingQuestionResponseDisplay data={data} />;
        };
        break;
      case "textQuestion":
        render = function _() {
          return <TextQuestionResponseDisplay data={data} />;
        };
        break;
      case "emailQuestion":
        render = function _() {
          return <EmailQuestionResponseDisplay data={data} />;
        };
        break;
      case "multipleChoiceQuestion":
        render = function _() {
          return <MultipleChoiceQuestionResponseDisplay data={data} />;
        };
        break;
      case "netPromoterScore":
        render = function _() {
          return <NetPromoterScoreQuestionResponseDisplay data={data} />;
        };
        break;
      default:
        render = function _() {
          return <RatingQuestionResponseDisplay data={data} />;
        };
        break;
    }
  }
  return render;
}
function UndefinedReminder() {
  return <span>{"[not provided]"}</span>;
}
