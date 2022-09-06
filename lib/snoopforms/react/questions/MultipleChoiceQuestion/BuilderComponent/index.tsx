import { useEffect, useState } from "react";
import Mark from "../../toolkit/ui/Mark";
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
  const handleUpdateOption = (index: number, newLabel: string) => {
    setOptions((prev) => {
      const newOptions = [...prev];
      newOptions.splice(index, 1, { label: newLabel, value: newLabel });
      return newOptions;
    });
  };
  const handleDeleteOption = (index: number) => {
    setOptions((prev) => {
      const newOptions = [...prev];
      newOptions.splice(index, 1);
      return newOptions;
    });
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
      <div style={{ marginTop: "4px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        {options.map((option, i) => (
          <div key={i} style={{ marginTop: "8px", display: "flex", alignItems: "center" }}>
            <QuestionRadio key={i} disable editable label={option.label} onLabelChange={(newLabel) => handleUpdateOption(i, newLabel)} />
            <DeleteButton onClick={() => handleDeleteOption(i)} />
          </div>
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

function DeleteButton({ onClick }: { onClick: () => void }) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "inline-flex",
        padding: "4px",
        transition: "all .2s cubic-bezier(.4,.2,0,1)",
        color: isHovering ? "#f53b57" : "#aebdcb",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ width: "16px", height: "16px" }}>
        <path
          fillRule="evenodd"
          d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
}
