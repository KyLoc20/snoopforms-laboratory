import { useState } from "react";
import Select from "@/lib/ui/Select";
import Rating from "./Rating";
interface RatingQuestionProps {}
export default function RatingQuestionComponent({}: RatingQuestionProps) {
  const [num, setNum] = useState(5);
  return (
    <div className="question-container" style={{ paddingBottom: "20px", minHeight: "400px" }}>
      <div className="question-input" style={{ color: "rgba(56, 70, 84, 1)", height: "28px", display: "flex", alignItems: "center" }}>
        <input type="text" placeholder="Your Question" style={{ width: "100%", lineHeight: "24px", fontSize: "16px", fontWeight: 700 }} />
      </div>
      <div style={{ marginTop: "8px" }}>
        <Rating
          options={Array(num)
            .fill(0)
            .map((_, n) => ({ name: n.toString() }))}
        ></Rating>
      </div>
      <div className="setting-panel" style={{ marginTop: "8px" }}>
        <Select
          options={["1", "2", "3", "4", "5"].map((name, i) => ({ name }))}
          label={"num"}
          width={40}
          onChange={(value) => {
            setNum(parseInt(value));
          }}
        ></Select>
      </div>
    </div>
  );
}
