import { PropsWithChildren, useState, ChangeEvent } from "react";
import { debounce } from "lodash";
export default function TextField({
  onChange,
  disabled,
  type,
  placeholder,
  defaultValue,
  debounceTimeout,
  renderIcon: RenderIcon,
}: PropsWithChildren<TextFieldProps>) {
  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    //debounce works well
    onChange(e.target.value);
  }, debounceTimeout ?? 1000);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <label
      className="question-input"
      style={{
        maxWidth: "384px",
        padding: "8px 12px",
        background: "#fff",
        border: `1px solid ${isFocused ? "#0190c8" : "#aebdcb"}`,
        color: "#8299ae",
        borderRadius: "16px",
        boxShadow: isFocused ? "0 0 0 1px #0190c8" : "",
        display: "flex",
        alignItems: "center",
        cursor: "text",
      }}
    >
      {RenderIcon && (
        <div style={{ display: "flex", alignItems: "center", marginRight: "8px" }}>
          <RenderIcon />
        </div>
      )}
      <input
        // DO NOT check pattern here
        // pattern={type === "email" ? "^[A-Za-z0-9]+@[A-Za-z0-9]+.com$" : undefined}
        disabled={disabled}
        type={type ?? "text"}
        onInvalid={(e) => e.preventDefault()}
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
        }}
      />
    </label>
  );
}
type AvailableType = "text" | "email" | "phone";
type TextFieldProps = {
  disabled?: boolean;
  type?: AvailableType;
  defaultValue?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  debounceTimeout?: number;
  renderIcon?: React.FC;
};
