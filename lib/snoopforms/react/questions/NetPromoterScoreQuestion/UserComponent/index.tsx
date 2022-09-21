import { useEffect, useState } from "react";
import { QuestionContainer } from "../../toolkit/ui";
import useInputValidator, { AlarmPlaceholder } from "../../toolkit/base/validate";
import { NetPromoterScoreQuestionConfigData, NetPromoterScoreQuestionSubmissionData } from "../types";
import ScoreList from "../ScoreList";
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
    console.log("UserComponent", score);
  }, [score]);

  const handleSelect = (score: number) => {
    setscore(score);
  };

  return (
    <QuestionContainer title={title} isRequired={isRequired}>
      <div className="score-list" style={{ marginTop: "4px" }}>
        <ScoreList num={11} bestText={bestText} worstText={worstText} onChange={handleSelect}></ScoreList>
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
