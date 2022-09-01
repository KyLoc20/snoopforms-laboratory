import { RatingQuestionResponseDisplay } from "../RatingQuestion";
import { TextQuestionResponseDisplay } from "../TextQuestion";
export { createResponseDisplay };
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
          return <RatingQuestionResponseDisplay data={data}></RatingQuestionResponseDisplay>;
        };
        break;
      case "textQuestion":
        render = function _() {
          return <TextQuestionResponseDisplay data={data}></TextQuestionResponseDisplay>;
        };
        break;
      default:
        render = function _() {
          return <RatingQuestionResponseDisplay data={data}></RatingQuestionResponseDisplay>;
        };
        break;
    }
  }
  return render;
}
function UndefinedReminder() {
  return <span>{"[not provided]"}</span>;
}
