import { useState } from "react";
import Select from "@/lib/ui/Select";
import Rating from "./Rating";
import { Listbox } from "@headlessui/react";
import Switch from "@/lib/ui/Switch";
import QuestionInput from "../../base/QuestionInput";
type AvailableIcon = "stars" | "hearts";
interface RatingQuestionProps {}
export default function RatingQuestionComponent({}: RatingQuestionProps) {
  const [num, setNum] = useState(5);
  const [icon, setIcon] = useState<AvailableIcon>("stars");
  const [isRequired, setIsRequired] = useState(false);

  return (
    <div className="question-container" style={{ paddingBottom: "20px" }}>
      <div style={{ position: "relative" }}>
        <QuestionInput></QuestionInput>
        {isRequired && (
          <div
            style={{ paddingRight: "12px", color: "rgba(245, 59, 87, 1)", lineHeight: "24px", fontSize: "18px", position: "absolute", top: "0", right: "0" }}
          >
            *
          </div>
        )}
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
        className="setting-panel"
        style={{
          borderTop: "dashed 2px rgb(210, 218, 226)",
          marginTop: "8px",
          paddingTop: "8px",
          display: "flex",
          alignItems: "center",
          rowGap: "8px",
          columnGap: "8px",
        }}
      >
        <Select
          options={["1", "2", "3", "4", "5"].map((name, i) => ({ name }))}
          label={"num"}
          width={40}
          onChange={(value) => {
            setNum(parseInt(value));
          }}
        ></Select>
        <Select
          options={["stars", "hearts"].map((name, i) => ({ name }))}
          label={"icon"}
          width={40}
          onChange={(value) => {
            setIcon(value as AvailableIcon);
          }}
        ></Select>
        <Switch label={"Required"} onChange={() => setIsRequired((prev) => !prev)} defaultValue={true}></Switch>
        <div>Required</div>
      </div>
    </div>
  );
}
const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];
