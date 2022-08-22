import {
  RatingQuestionSummaryDisplay,
  RatingQuestionSubmissionData,
  RatingQuestionConfigData,
  RatingQuestionSummaryData,
} from "@/lib/snoopforms/react/questions/RatingQuestion";
export { createSummaryDisplay, createSummaryHandler };
function createSummaryDisplay(type: string) {
  switch (type) {
    case "ratingQuestion":
      return RatingQuestionSummaryDisplay;
    default:
      return RatingQuestionSummaryDisplay;
  }
}

function createSummaryHandler(type: string): (config: any, details: any[]) => any {
  switch (type) {
    case "ratingQuestion":
      // { num: 10, icon: "hearts", isRequired: false, title: "How do you like this stuff?" }
      // [{ rating: 1 }, { rating: 2 }]
      return (config: RatingQuestionConfigData, details: RatingQuestionSubmissionData[]): RatingQuestionSummaryData => {
        const title = config.title;
        const options: { [key: string]: number } = {};
        for (let i = 0; i <= config.num; i++) {
          options[i.toString()] = 0;
        }
        details.forEach((detail) => {
          const k = detail.ratings.toString();
          options[k] = options[k] ? options[k] + 1 : 1;
        });
        return { title, options };
      };
    default:
      return (config: any, details: any[]): any => {};
  }
}
