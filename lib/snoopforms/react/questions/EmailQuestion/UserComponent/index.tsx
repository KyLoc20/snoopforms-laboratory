import { useEffect, useState } from "react";
import Mark from "../../toolkit/ui/Mark";
import TextField from "../../toolkit/ui/TextField";
import { QuestionContainer } from "../../toolkit/ui";
import useInputValidator, { AlarmPlaceholder } from "../../toolkit/base/validate";
import { EmailQuestionConfigData, EmailQuestionSubmissionData } from "../types";
import EmailIcon from "../common/EmailIcon";
//open to extension in the future such as conditional info
interface TextQuestionProps {
  config: EmailQuestionConfigData;
  initialData: EmailQuestionSubmissionData;
  onSubmissionChange: (data: EmailQuestionSubmissionData) => void;
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
        <TextField onChange={handleContentChange} renderIcon={EmailIcon} placeholder={placeholder} type="email" />
      </div>
      <Validator></Validator>
      <AlarmPlaceholder>{shouldAlarm && validationError}</AlarmPlaceholder>
    </QuestionContainer>
  );
}
//void allowed
const isValidEmailAddress = (value: string) => {
  if (value === "") return true;
  const regex = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
  return regex.test(value);
};
const validate = (value: string, isRequired: boolean) => {
  if (isRequired && !Boolean(value)) {
    return "Required";
  }
  if (!isValidEmailAddress(value)) {
    return "Invalid Email Address";
  }
  return "";
};
