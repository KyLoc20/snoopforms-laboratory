import { divide, throttle } from "lodash";
import { ChangeEvent } from "react";
/**
 * @param disable if true, cann't be selected
 * @param editable if true, the label can be modified
 * @param onLabelChange only if editable === true, to modify label
 */
type QuestionRadioProps = {
  disable?: boolean;
  editable?: boolean;
  selected?: boolean;
  label: string;
  OnSelect?: (value: string) => void;
  onLabelChange?: (value: string) => void;
};
export default function QuestionRadio({ label, selected, editable, disable, OnSelect, onLabelChange }: QuestionRadioProps) {
  const handleChange = throttle((e: ChangeEvent<HTMLInputElement>) => {
    onLabelChange?.(e.target.value);
  }, 2000);
  return (
    <div className="question-radio" style={{ height: "28px", display: "flex", alignItems: "center" }}>
      <div style={{ position: "relative", cursor: "pointer", width: "24px" }}>
        <OuterCircle />
        <InnerCircle />
      </div>
      <div style={{ marginLeft: "8px", display: "flex", fontWeight: 500, lineHeight: "24px", color: DARK_COLOR }}>
        {editable ? (
          <input className="label-editor" style={{ width: "360px" }} defaultValue={label} placeholder={"Type Option Label"} onChange={handleChange} />
        ) : (
          <div className="label-display"></div>
        )}
      </div>
    </div>
  );
}
const LIGHT_COLOR = "#aebdcb";
const DARK_COLOR = "#323d48";

function OuterCircle({}) {
  return (
    <div style={{ color: LIGHT_COLOR }}>
      <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
      </svg>
    </div>
  );
}
function InnerCircle({}) {
  return (
    <div style={{ position: "absolute", left: 0, top: 0, color: LIGHT_COLOR }}>
      <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path>
      </svg>
    </div>
  );
}
