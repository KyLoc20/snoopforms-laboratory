import { useEffect, useState } from "react";
import { QuestionRadio, QuestionContainer } from "../../toolkit/ui";
import useInputValidator, { AlarmPlaceholder } from "../../toolkit/base/validate";
import { NetPromoterScoreQuestionConfigData, NetPromoterScoreQuestionSubmissionData } from "../types";

//open to extension in the future such as conditional info
interface NetPromoterScoreQuestionProps {
  config: NetPromoterScoreQuestionConfigData;
  initialData: NetPromoterScoreQuestionSubmissionData;
  onSubmissionChange: (data: NetPromoterScoreQuestionSubmissionData) => void;
}
export default function UserComponent({ config, initialData, onSubmissionChange }: NetPromoterScoreQuestionProps) {
  const { title, isRequired, bestText, worstText } = config;
  const [score, setscore] = useState(initialData.score);

  const validationError = validate(score, isRequired);
  const { Validator, shouldAlarm, hideAlarm } = useInputValidator(validationError);
  useEffect(() => {
    //when input updates, hideAlarm
    if (shouldAlarm) hideAlarm();
    //should init
    onSubmissionChange({ score });
  }, [score]);

  const handleSelect = (score: number) => {
    setscore(score);
  };

  return (
    <QuestionContainer title={title} isRequired={isRequired}>
      <div className="option-list" style={{ marginTop: "4px" }}>
        0-10
        {/* {options.map((option, i) => (
          <div key={i} className="option-wrapper" style={{ marginTop: "8px", display: "flex", alignItems: "center", maxWidth: "424px", minWidth: "288px" }}>
            <QuestionRadio
              key={i}
              label={option.label}
              onSelect={handleSelect}
              selected={choiceList.findIndex((choice) => choice.label === option.label) > -1}
            />
          </div>
        ))} */}
      </div>
      <Validator></Validator>
      <AlarmPlaceholder>{shouldAlarm && validationError}</AlarmPlaceholder>
    </QuestionContainer>
  );
}
const validate = (value: number, isRequired: boolean) => {
  if (isRequired && value < 0) {
    //-1 means null
    return "Please Choose One Score";
  }
  return "";
};
