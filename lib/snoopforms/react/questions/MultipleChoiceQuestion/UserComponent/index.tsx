import { useEffect, useState } from "react";
import Mark from "../../toolkit/ui/Mark";
import { QuestionRadio, QuestionTitle } from "../../toolkit/ui";
import useInputValidator, { AlarmPlaceholder } from "../../toolkit/base/validate";
import { MultipleChoiceQuestionConfigData, MultipleChoiceQuestionSubmissionData } from "../types";

//open to extension in the future such as conditional info
interface MultipleChoiceQuestionProps {
  config: MultipleChoiceQuestionConfigData;
  initialData: MultipleChoiceQuestionSubmissionData;
  onSubmissionChange: (data: MultipleChoiceQuestionSubmissionData) => void;
}
export default function UserComponent({ config, initialData, onSubmissionChange }: MultipleChoiceQuestionProps) {
  const { title, isRequired, onlyOne, options } = config;
  const initialList = initialData?.choiceList ?? [];
  const [choiceList, setChoiceList] = useState(initialList.length > 0 ? (onlyOne ? [initialList[0]] : initialList) : []);

  const validationError = validate(choiceList.length, isRequired);
  const { Validator, shouldAlarm, hideAlarm } = useInputValidator(validationError);
  useEffect(() => {
    //when input updates, hideAlarm
    if (shouldAlarm) hideAlarm();
    //should init
    onSubmissionChange({ choiceList });
  }, [choiceList]);

  const handleSelect = (label: string) => {
    if (onlyOne) {
      //single mode
      const curChoiceLabel = choiceList[0]?.label;
      if (curChoiceLabel === label) {
        //reset
        setChoiceList([]);
      } else {
        setChoiceList([{ label, value: label }]);
      }
    } else {
      //multiple mode
      setChoiceList((prevList) => {
        const newList = [...prevList];
        const possibleIdx = prevList.findIndex((choice) => choice.label === label);
        if (possibleIdx > -1) {
          //reset
          newList.splice(possibleIdx, 1);
        } else {
          newList.push({ label, value: label });
        }
        return newList;
      });
    }
  };

  return (
    <div className="question-container" style={{ paddingBottom: "20px", position: "relative" }}>
      <div style={{ position: "relative" }}>
        <QuestionTitle title={title} />
        <Mark active={isRequired}></Mark>
      </div>
      <div style={{ marginTop: "4px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        {options.map((option, i) => (
          <div key={i} style={{ marginTop: "8px", display: "flex", alignItems: "center" }}>
            <QuestionRadio
              key={i}
              label={option.label}
              onSelect={handleSelect}
              selected={choiceList.findIndex((choice) => choice.label === option.label) > -1}
            />
          </div>
        ))}
      </div>
      <Validator></Validator>
      <AlarmPlaceholder>{shouldAlarm && validationError}</AlarmPlaceholder>
    </div>
  );
}
const validate = (value: number, isRequired: boolean) => {
  if (isRequired && value <= 0) {
    return "Please Choose At Least One Option";
  }
  return "";
};
