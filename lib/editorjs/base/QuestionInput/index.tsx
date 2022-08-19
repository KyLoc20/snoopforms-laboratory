import { throttle } from "lodash";
import { ChangeEvent } from "react";
export default function QuestionInput({ placeholder, onChange }: { placeholder?: string; onChange: (value: string) => void }) {
  const handleChange = throttle((e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, 2000);
  return (
    <div className="question-input" style={{ color: "rgba(56, 70, 84, 1)", height: "28px", display: "flex", alignItems: "center" }}>
      <input
        type="text"
        placeholder={placeholder ?? "Your Question"}
        onChange={handleChange}
        style={{ width: "100%", lineHeight: "24px", fontSize: "16px", fontWeight: 700 }}
      />
    </div>
  );
}
