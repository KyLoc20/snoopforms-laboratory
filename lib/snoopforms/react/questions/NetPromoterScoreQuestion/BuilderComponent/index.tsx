import { useEffect, useState } from "react";
import Mark from "../../toolkit/ui/Mark";
import { Switch, QuestionInput, QuestionRadio, Divider, ConfigurablePanel, Button } from "../../toolkit/ui";
import { NetPromoterScoreQuestionConfigData } from "../types";
interface NetPromoterScoreQuestionProps {
  onDataChange: (data: NetPromoterScoreQuestionConfigData) => void;
  initialData: NetPromoterScoreQuestionConfigData;
}
export default function BuilderComponent({ onDataChange, initialData }: NetPromoterScoreQuestionProps) {
  const [title, setTitle] = useState(initialData.title);
  const [bestText, setBestText] = useState(initialData.bestText);
  const [worstText, setWorstText] = useState(initialData.worstText);
  const [isRequired, setIsRequired] = useState(initialData.isRequired);

  useEffect(() => {
    onDataChange({ title, isRequired, bestText, worstText });
  }, [title, isRequired, bestText, worstText]);
  return (
    <div className="question-container" style={{ paddingBottom: "20px" }}>
      <div style={{ position: "relative" }}>
        <QuestionInput defaultValue={title} onChange={(v) => setTitle(v)} />
        <Mark active={isRequired}></Mark>
      </div>
      <div className="option-list" style={{ marginTop: "4px" }}>
        0-10
        {/* {options.map((option, i) => (
          <div key={i} className="option-wrapper" style={{ marginTop: "8px", display: "flex", alignItems: "center", maxWidth: "424px", minWidth: "288px" }}>
            <QuestionRadio disable editable label={option.label} onLabelChange={(newLabel) => handleUpdateOption(i, newLabel)} />
            <DeleteButton onClick={() => handleDeleteOption(i)} />
          </div>
        ))} */}
      </div>
      <ConfigurablePanel>
        <Switch label={"Required"} onChange={() => setIsRequired((prev) => !prev)} defaultValue={isRequired}></Switch>
      </ConfigurablePanel>
    </div>
  );
}
