import { useEffect, useState } from "react";
import Rating from "../common/Rating";
import Mark from "../common/Mark";
import { QuestionTitle } from "../../toolkit/ui";
import useInputValidator from "../../toolkit/base/validate";
type AvailableIcon = "stars" | "hearts";
type RatingQuestionConfigData = {
  title: string; //Question title
  num: number; //rating range [0, num]
  icon: AvailableIcon;
  isRequired: boolean;
};
export type RatingQuestionSubmissionData = {
  ratings: number;
};

//open to extension in the future such as conditional info
interface RatingQuestionProps {
  config: RatingQuestionConfigData;
  initialData: RatingQuestionSubmissionData;
  onSubmissionChange: (data: RatingQuestionSubmissionData) => void;
}
export default function UserComponent({ config, initialData, onSubmissionChange }: RatingQuestionProps) {
  const { title, num, icon, isRequired } = config;
  const [value, setValue] = useState<number>(initialData.ratings);
  const _options = Array(num)
    .fill(0)
    .map((_, n) => ({ name: n.toString() }));

  const canSubmit = isRequired ? value > 0 : true;
  const { Validator, shouldShowReminder, hideReminder } = useInputValidator(canSubmit);

  useEffect(() => {
    if (value === 0 && isRequired) {
      //no submission received
    } else {
      if (shouldShowReminder) hideReminder();
    }
    //should init
    onSubmissionChange({ ratings: value });
  }, [value]);

  const handleRatingChange = (v: number) => {
    // -1 means no rating while v === ratings - 1
    setValue(v === -1 ? 0 : v + 1);
  };
  return (
    <div className="question-container" style={{ paddingBottom: "20px" }}>
      <div style={{ position: "relative" }}>
        <QuestionTitle title={title} />
        <Mark active={isRequired}></Mark>
        <Validator></Validator>
        {shouldShowReminder ? "No Empty!" : ""}
      </div>
      <div style={{ marginTop: "8px" }}>
        <Rating options={_options} icon={icon} onChange={handleRatingChange}></Rating>
      </div>
    </div>
  );
}
{
  /* <input
  style={{ position: "absolute", width: "1px", height: "1px", margin: "-1px", overflow: "hidden", clip: "rect(0px, 0px, 0px, 0px)" }}
  type="text"
  name="validator"
  value={(canSubmit && "yes") || "no"}
  onInvalid={(e) => {
    //fires before onSubmit if HTMLInputElement.checkValidity() returns false
    e.preventDefault();
  }}
  pattern="yes"
  onChange={() => {}}
/>; */
}
