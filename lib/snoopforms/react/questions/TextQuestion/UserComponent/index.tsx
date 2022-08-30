import { useEffect, useState } from "react";
import Mark from "../../toolkit/ui/Mark";
import TextField from "../../toolkit/ui/TextField";
import { QuestionTitle } from "../../toolkit/ui";
import useInputValidator from "../../toolkit/base/validate";
import { TextQuestionConfigData, TextQuestionSubmissionData } from "../types";

//open to extension in the future such as conditional info
interface TextQuestionProps {
  config: TextQuestionConfigData;
  initialData: TextQuestionSubmissionData;
  onSubmissionChange: (data: TextQuestionSubmissionData) => void;
}
export default function UserComponent({ config, initialData, onSubmissionChange }: TextQuestionProps) {
  const { title, isRequired } = config;
  const [value, setValue] = useState<string>(initialData.content);

  const canSubmit = isRequired ? Boolean(value) : true;
  const { Validator, shouldShowReminder, hideReminder } = useInputValidator(canSubmit);

  useEffect(() => {
    if (value === "" && isRequired) {
      //no submission received
    } else {
      if (shouldShowReminder) hideReminder();
    }
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
        <TextField onChange={handleContentChange} />
      </div>
    </div>
  );
}
