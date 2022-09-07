import { useEffect, useState } from "react";
import Mark from "../../toolkit/ui/Mark";
import TextField from "../../toolkit/ui/TextField";
import { QuestionTitle } from "../../toolkit/ui";
import useInputValidator, { AlarmPlaceholder } from "../../toolkit/base/validate";
import { TextQuestionConfigData, TextQuestionSubmissionData } from "../types";

//open to extension in the future such as conditional info
interface TextQuestionProps {
  config: TextQuestionConfigData;
  initialData: TextQuestionSubmissionData;
  onSubmissionChange: (data: TextQuestionSubmissionData) => void;
}
export default function UserComponent({ config, initialData, onSubmissionChange }: TextQuestionProps) {
  const { title, placeholder, isRequired } = config;
  const [value, setValue] = useState<string>(initialData.content);

  const validationError = validate(value, isRequired);
  const { Validator, shouldAlarm, hideAlarm } = useInputValidator(validationError);
  useEffect(() => {
    //when input updates, hideAlarm
    if (shouldAlarm) hideAlarm();
    //should init
    onSubmissionChange({ content: value });
  }, [value]);

  const handleContentChange = (v: string) => {
    setValue(v);
  };
  return (
    <div className="question-container" style={{ paddingBottom: "20px", position: "relative" }}>
      <div style={{ position: "relative" }}>
        <QuestionTitle title={title} />
        <Mark active={isRequired}></Mark>
      </div>
      <div style={{ marginTop: "8px" }}>
        <TextField onChange={handleContentChange} placeholder={placeholder} />
      </div>
      <Validator></Validator>
      <AlarmPlaceholder>{shouldAlarm && validationError}</AlarmPlaceholder>
    </div>
  );
}
const validate = (value: string, isRequired: boolean) => {
  if (isRequired && !Boolean(value)) {
    return "Required";
  }
  return "";
};
