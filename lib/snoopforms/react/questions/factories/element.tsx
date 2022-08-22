import { GlobeAltIcon, MailIcon, PhoneIcon } from "@heroicons/react/solid";
import { SnoopElement } from "@snoopforms/react";
import { BlockData } from "@/lib/types";
import { PropsWithChildren } from "react";
import RatingQuestion, { RatingQuestionSubmissionData } from "@/lib/snoopforms/react/questions/RatingQuestion";
export { createQuestionElement };
const createQuestionElement = (type: string, block: BlockData) => {
  let render: React.FC<{ onSubmissionChange: (data: any) => void }>;
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
              num: block.data._component?.num,
              icon: block.data._component?.icon,
              isRequired: block.data._component?.isRequired,
            }}
            initialData={{
              ratings: 0,
            }}
            onSubmissionChange={(data) => onSubmissionChange({ ...data, questionId: block.id, type: "ratingQuestion" })}
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
