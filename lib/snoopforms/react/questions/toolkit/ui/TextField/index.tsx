import { PropsWithChildren, useState, ChangeEvent } from "react";
import { throttle } from "lodash";

export default function TextField({
  onChange,
  placeholder,
  defaultValue,
}: PropsWithChildren<{ defaultValue?: string; placeholder?: string; onChange: (value: string) => void }>) {
  const handleChange = throttle((e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, 2000);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <label className="question-input" style={{ maxWidth: "384px", color: "rgba(56, 70, 84, 1)", display: "flex", alignItems: "center" }}>
      <input
        type="text"
        placeholder={placeholder ?? ""}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        defaultValue={defaultValue}
        style={{
          width: "100%",
          lineHeight: "20px",
          fontSize: "14px",
          fontWeight: 400,
          padding: "8px 12px",
          background: "#fff",
          border: `1px solid ${isFocused ? "#0190c8" : "#aebdcb"}`,
          color: "#8299ae",
          borderRadius: "16px",
          boxShadow: isFocused ? "0 0 0 1px #0190c8" : "",
        }}
      />
    </label>
  );
}
//block w-full max-w-sm mt-1 text-sm text-gray-400 border-gray-300 rounded-md shadow-sm placeholder:text-gray-300
