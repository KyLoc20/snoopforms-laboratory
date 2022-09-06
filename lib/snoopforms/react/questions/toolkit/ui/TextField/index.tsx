import { PropsWithChildren, useState, ChangeEvent } from "react";
import { throttle } from "lodash";
export default function TextField({ onChange, type, placeholder, defaultValue, throttleTimeout, renderIcon: RenderIcon }: PropsWithChildren<TextFieldProps>) {
  const handleChange = throttle((e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, throttleTimeout ?? 2000);
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
        // color: "rgba(56, 70, 84, 1)",
        display: "flex",
        alignItems: "center",
      }}
    >
      {RenderIcon && (
        <div style={{ display: "flex", alignItems: "center", marginRight: "8px" }}>
          <RenderIcon />
        </div>
      )}
      <input
        type={type ?? "text"}
        pattern={type === "email" ? ".+@.+.com" : undefined}
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
  // return (
  //   <label className="question-input" style={{ maxWidth: "384px", color: "rgba(56, 70, 84, 1)", display: "flex", alignItems: "center" }}>
  //     {RenderIcon && <RenderIcon />}
  //     <input
  //       type={type ?? "text"}
  //       pattern={type === "email" ? ".+@.+.com" : undefined}
  //       placeholder={placeholder ?? ""}
  //       onChange={handleChange}
  //       onFocus={() => setIsFocused(true)}
  //       onBlur={() => setIsFocused(false)}
  //       defaultValue={defaultValue}
  //       style={{
  //         width: "100%",
  //         lineHeight: "20px",
  //         fontSize: "14px",
  //         fontWeight: 400,
  //         padding: "8px 12px",
  //         background: "#fff",
  //         border: `1px solid ${isFocused ? "#0190c8" : "#aebdcb"}`,
  //         color: "#8299ae",
  //         borderRadius: "16px",
  //         boxShadow: isFocused ? "0 0 0 1px #0190c8" : "",
  //       }}
  //     />
  //   </label>
  // );
}
type AvailableType = "text" | "email" | "phone";
type TextFieldProps = {
  type?: AvailableType;
  defaultValue?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  throttleTimeout?: number;
  renderIcon?: React.FC;
};
