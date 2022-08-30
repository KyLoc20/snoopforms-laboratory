import { PropsWithChildren } from "react";
import RatingQuestion, { RatingQuestionSubmissionData } from "@/lib/snoopforms/react/questions/RatingQuestion";
import TextQuestion, { TextQuestionSubmissionData } from "@/lib/snoopforms/react/questions/TextQuestion";

export { createQuestionElement };
export type PreSubmissionData = {
  //without id
  questionId: string; //BlockData->id
  questionType: string;
  details: any; //content
};
export type BlockDataForQuestion = {
  id: string; //if this Block represents a Question, this is the questionId
  type: string;
  data: any;
};
const createQuestionElement = (type: string, block: BlockDataForQuestion) => {
  //data: any should be SubmissionData
  let render: React.FC<{ onSubmissionChange: (preData: PreSubmissionData) => void }>;
  switch (type) {
    case "paragraph":
      render = function _({ onSubmissionChange }) {
        return <p className="ce-paragraph">{block.data.text}</p>;
      };
      break;
    case "header":
      render = function _({ onSubmissionChange }) {
        return <SnoopElementHeading level={block.data.level as number}>{block.data.text}</SnoopElementHeading>;
      };
      break;
    case "ratingQuestion":
      render = function _({ onSubmissionChange }) {
        return (
          <RatingQuestion
            config={{
              title: block.data._component?.title,
              num: block.data._component?.num ?? 5,
              icon: block.data._component?.icon,
              isRequired: block.data._component?.isRequired,
            }}
            initialData={{
              ratings: 0,
            }}
            onSubmissionChange={(data) => onSubmissionChange({ details: data, questionId: block.id, questionType: "ratingQuestion" })}
          />
        );
      };
      break;
    case "textQuestion":
      render = function _({ onSubmissionChange }) {
        return (
          <TextQuestion
            config={{
              title: block.data._component?.title,
              isRequired: block.data._component?.isRequired,
            }}
            initialData={{
              content: "",
            }}
            onSubmissionChange={(data) => onSubmissionChange({ details: data, questionId: block.id, questionType: "ratingQuestion" })}
          />
        );
      };
      break;
    default:
      render = function _({ onSubmissionChange }) {
        return <></>;
      };
      break;
  }
  return render;
};
// const ELEMENT_REGISTRIES: { [name: string]: React.FC<any> } = {
//   ratingQuestion: RatingQuestion,
// };
function SnoopElementHeading({ children, level }: PropsWithChildren<{ level: number }>) {
  if (level === 1) {
    return <h1 className="ce-header">{children}</h1>;
  } else if (level === 2) {
    return <h2 className="ce-header">{children}</h2>;
  } else if (level === 3) {
    return <h3 className="ce-header">{children}</h3>;
  } else {
    return <h3 className="ce-header">{children}</h3>;
  }
}
