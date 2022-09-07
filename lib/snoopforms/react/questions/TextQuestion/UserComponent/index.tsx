import { useEffect, useState } from "react";
import TextField from "../../toolkit/ui/TextField";
import { QuestionContainer } from "../../toolkit/ui";
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
    <QuestionContainer title={title} isRequired={isRequired}>
      <div style={{ marginTop: "8px" }}>
        <TextField onChange={handleContentChange} placeholder={placeholder} />
      </div>
      <Validator></Validator>
      <AlarmPlaceholder>{shouldAlarm && validationError}</AlarmPlaceholder>
    </QuestionContainer>
  );
}
const validate = (value: string, isRequired: boolean) => {
  if (isRequired && !Boolean(value)) {
    return "Required";
  }
  return "";
};
