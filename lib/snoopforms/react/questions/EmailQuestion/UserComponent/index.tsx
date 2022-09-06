import { useEffect, useState } from "react";
import Mark from "../../toolkit/ui/Mark";
import TextField from "../../toolkit/ui/TextField";
import { QuestionTitle } from "../../toolkit/ui";
import useInputValidator from "../../toolkit/base/validate";
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

  const canSubmit = (isRequired ? Boolean(value) : true) && isValidEmailAddress(value);
  const { Validator, shouldShowReminder, hideReminder } = useInputValidator(canSubmit);
  useEffect(() => {
    //when input updates, hideReminder
    if (shouldShowReminder) hideReminder();
    //should init
    onSubmissionChange({ content: value });
  }, [value]);

  const handleContentChange = (v: string) => {
    setValue(v);
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
        <TextField onChange={handleContentChange} renderIcon={EmailIcon} placeholder={placeholder} type="email" />
      </div>
    </div>
  );
}
//allow void
const isValidEmailAddress = (value: string) => {
  if (value === "") return true;
  const regex = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
  return regex.test(value);
};
