import { useEffect, useState } from "react";
import Rating from "../common/Rating";
import Mark from "../common/Mark";
import { QuestionTitle } from "../../toolkit/ui";
import useInputValidator from "../../toolkit/base/validate";
import { RatingQuestionConfigData, RatingQuestionSubmissionData } from "../types";

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
