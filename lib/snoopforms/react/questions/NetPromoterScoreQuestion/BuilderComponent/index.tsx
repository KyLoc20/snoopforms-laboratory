import { useEffect, useState } from "react";
import Mark from "../../toolkit/ui/Mark";
import { Switch, QuestionInput, Divider, TextField, ConfigurablePanel } from "../../toolkit/ui";
import { NetPromoterScoreQuestionConfigData } from "../types";
import ScoreList from "../ScoreList";
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
      <div className="score-list" style={{ marginTop: "4px" }}>
        <ScoreList num={11} bestText={bestText} worstText={worstText}></ScoreList>
      </div>
      <ConfigurablePanel>
        <TextField onChange={setWorstText} defaultValue={worstText} placeholder={"Lowest Indicator"} />
        <Divider h={38} />
        <TextField onChange={setBestText} defaultValue={bestText} placeholder={"Highest Indicator"} />
        <Divider h={38} />
        <Switch label={"Required"} onChange={() => setIsRequired((prev) => !prev)} defaultValue={isRequired}></Switch>
      </ConfigurablePanel>
    </div>
  );
}
