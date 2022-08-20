import { useEffect, useState } from "react";
import Rating from "../common/Rating";
import Mark from "../common/Mark";
import { Select, Switch, QuestionInput, Divider } from "../../toolkit/ui";
type AvailableIcon = "stars" | "hearts";
export type RatingComponentCustomData = {
  title: string;
  num: number; //for builder
  icon: AvailableIcon; //for builder
  isRequired: boolean; //for builder
};
interface RatingQuestionProps {
  onDataChange: (data: RatingComponentCustomData) => void;
  initialData: RatingComponentCustomData;
}
export default function BuilderComponent({ onDataChange, initialData }: RatingQuestionProps) {
  const [title, setTitle] = useState(initialData.title);
  const [num, setNum] = useState(initialData.num);
  const [icon, setIcon] = useState<AvailableIcon>(initialData.icon);
  const [isRequired, setIsRequired] = useState(initialData.isRequired);
  useEffect(() => {
    onDataChange({ title, num, icon, isRequired });
  }, [title, num, icon, isRequired]);
  return (
    <div className="question-container" style={{ paddingBottom: "20px" }}>
      <div style={{ position: "relative" }}>
        <QuestionInput defaultValue={title} onChange={(v) => setTitle(v)} />
        <Mark active={isRequired}></Mark>
      </div>
      <div style={{ marginTop: "8px" }}>
        <Rating
          options={Array(num)
            .fill(0)
            .map((_, n) => ({ name: n.toString() }))}
          icon={icon}
        ></Rating>
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
        <Select
          options={Array(10)
            .fill(0)
            .map((_, i) => ({ name: (i + 1).toString() }))}
          label={"num"}
          width={40}
          onChange={(value) => {
            setNum(parseInt(value));
          }}
        ></Select>
        <Divider h={38}></Divider>
        <Select
          options={["stars", "hearts"].map((name, i) => ({ name }))}
          label={"icon"}
          width={40}
          onChange={(value) => {
            setIcon(value as AvailableIcon);
          }}
        ></Select>
        <Divider h={38}></Divider>
        <Switch label={"Required"} onChange={() => setIsRequired((prev) => !prev)} defaultValue={isRequired}></Switch>
      </div>
    </div>
  );
}
