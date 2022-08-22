import { RatingQuestionSummaryDisplay } from "@/lib/snoopforms/react/questions/RatingQuestion";
export { createSummaryDisplay };
function createSummaryDisplay(type: string) {
  switch (type) {
    case "ratingQuestion":
      return RatingQuestionSummaryDisplay;
    default:
      return RatingQuestionSummaryDisplay;
  }
}
