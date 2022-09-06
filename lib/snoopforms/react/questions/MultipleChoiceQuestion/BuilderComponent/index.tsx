import { useEffect, useState } from "react";
import Mark from "../../toolkit/ui/Mark";
import TextField from "../../toolkit/ui/TextField";
import { Switch, QuestionInput, QuestionRadio, Divider, ConfigurablePanel, Button } from "../../toolkit/ui";
import { MultipleChoiceQuestionConfigData } from "../types";

interface MultipleChoiceQuestionProps {
  onDataChange: (data: MultipleChoiceQuestionConfigData) => void;
  initialData: MultipleChoiceQuestionConfigData;
}
export default function BuilderComponent({ onDataChange, initialData }: MultipleChoiceQuestionProps) {
  const [title, setTitle] = useState(initialData.title);
  const [options, setOptions] = useState(initialData.options.length === 0 ? [{ label: "Option 1", value: "Option 1" }] : initialData.options);
  const [isRequired, setIsRequired] = useState(initialData.isRequired);
  const [onlyOne, setOnlyOne] = useState(initialData.onlyOne);
  const handleAddOption = () => {
    setOptions((prev) => [...prev, { label: `Option ${prev.length + 1}`, value: `Option ${prev.length + 1}` }]);
  };
  useEffect(() => {
    onDataChange({ title, options, onlyOne, isRequired });
  }, [title, options, onlyOne, isRequired]);
  return (
    <div className="question-container" style={{ paddingBottom: "20px" }}>
      <div style={{ position: "relative" }}>
        <QuestionInput defaultValue={title} onChange={(v) => setTitle(v)} />
        <Mark active={isRequired}></Mark>
      </div>
      <div style={{ marginTop: "4px" }}>
        {options.map((option, i) => (
          <QuestionRadio key={i} disable editable label={option.label} />
        ))}
      </div>
      <ConfigurablePanel>
        <Button variant="outlined" onClick={handleAddOption}>
          Add Option
        </Button>
        <Divider h={38}></Divider>
        <Switch label={"Multiple Selection"} onChange={() => setOnlyOne((prev) => !prev)} defaultValue={!onlyOne}></Switch>
        <Divider h={38}></Divider>
        <Switch label={"Required"} onChange={() => setIsRequired((prev) => !prev)} defaultValue={isRequired}></Switch>
      </ConfigurablePanel>
    </div>
  );
}
