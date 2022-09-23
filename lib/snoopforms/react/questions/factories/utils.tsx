import { RatingQuestionSubmissionData } from "../RatingQuestion";
import { TextQuestionSubmissionData } from "../TextQuestion";
import { EmailQuestionSubmissionData } from "../EmailQuestion";
import { MultipleChoiceQuestionSubmissionData } from "../MultipleChoiceQuestion";
import { NetPromoterScoreQuestionSubmissionData } from "../NetPromoterScoreQuestion";
export { hasAnswer, isQuestionType };
/**
 * @QUESTION_SETTING
 */
const isQuestionType = (value: string) =>
  ["ratingQuestion", "multipleChoiceQuestion", "emailQuestion", "textQuestion", "netPromoterScoreQuestion"].includes(value);

/**
 * @QUESTION_SETTING
 */
const hasAnswer = (type: string, details: any) => {
  switch (type) {
    case "ratingQuestion":
      return (details as RatingQuestionSubmissionData).ratings > 0;
    case "textQuestion":
      return Boolean((details as TextQuestionSubmissionData).content);
    case "emailQuestion":
      return Boolean((details as EmailQuestionSubmissionData).content);
    case "multipleChoiceQuestion":
      return (details as MultipleChoiceQuestionSubmissionData).choiceList.length > 0;
    case "netPromoterScoreQuestion":
      return (details as NetPromoterScoreQuestionSubmissionData).score > -1;
    default:
      //unknown QuestionType
      return false;
  }
};
