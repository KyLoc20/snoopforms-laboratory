import { useEffect, useState } from "react";
import Mark from "../../toolkit/ui/Mark";
import TextField from "../../toolkit/ui/TextField";
import { Switch, QuestionInput, Divider } from "../../toolkit/ui";
import { TextQuestionConfigData } from "../types";
interface TextQuestionProps {
  onDataChange: (data: TextQuestionConfigData) => void;
  initialData: TextQuestionConfigData;
}
export default function BuilderComponent({ onDataChange, initialData }: TextQuestionProps) {
  const [title, setTitle] = useState(initialData.title);
  const [isRequired, setIsRequired] = useState(initialData.isRequired);
  useEffect(() => {
    onDataChange({ title, isRequired });
  }, [title, isRequired]);
  return (
    <div className="question-container" style={{ paddingBottom: "20px" }}>
      <div style={{ position: "relative" }}>
        <QuestionInput defaultValue={title} onChange={(v) => setTitle(v)} />
        <Mark active={isRequired}></Mark>
      </div>
      <div style={{ marginTop: "8px" }}>
        <TextField onChange={() => {}} />
      </div>
      <div
        className="configurable-panel"
        style={{
          borderTop: "dashed 2px rgb(210, 218, 226)",
          marginTop: "8px",
          paddingTop: "8px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Switch label={"Required"} onChange={() => setIsRequired((prev) => !prev)} defaultValue={isRequired}></Switch>
      </div>
    </div>
  );
}
