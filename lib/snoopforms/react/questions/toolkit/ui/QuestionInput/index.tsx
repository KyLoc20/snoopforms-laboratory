import { debounce } from "lodash";
import { ChangeEvent } from "react";
export default function QuestionInput({
  onChange,
  placeholder,
  defaultValue,
}: {
  defaultValue?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    //debounce works well
    onChange(e.target.value);
  }, 1000);
  return (
    <div className="question-input" style={{ color: "rgba(56, 70, 84, 1)", height: "28px", display: "flex", alignItems: "center" }}>
      <input
        type="text"
        placeholder={placeholder ?? "Type Your Question Here"}
        onChange={handleChange}
        defaultValue={defaultValue}
        style={{ width: "100%", lineHeight: "24px", fontSize: "16px", fontWeight: 700 }}
      />
    </div>
  );
}
