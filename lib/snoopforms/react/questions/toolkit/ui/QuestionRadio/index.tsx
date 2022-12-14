import { debounce } from "lodash";
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
  onSelect?: (label: string) => void;
  onLabelChange?: (label: string) => void;
};
export default function QuestionRadio({ label, selected, editable, disable, onSelect, onLabelChange }: QuestionRadioProps) {
  const handleLabelChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    //debounce works well
    onLabelChange?.(e.target.value);
  }, 1000);
  return (
    <div
      className="question-radio"
      style={{
        width: "100%",
        minHeight: "28px",
        display: "inline-flex",
        flexWrap: editable ? "nowrap" : "wrap",
        alignItems: editable ? "center" : "flex-start",
        cursor: editable || disable ? "default" : "pointer",
      }}
      onClick={() => {
        if (!disable) onSelect?.(label);
      }}
    >
      <div style={{ position: "relative", cursor: disable ? "default" : "pointer", width: "24px" }}>
        <OuterCircle active={!disable && selected} />
        <InnerCircle active={!disable && selected} />
      </div>
      <div style={{ marginLeft: "8px", display: "flex", fontWeight: 500, lineHeight: "24px", maxWidth: "360px", flex: 1, color: DARK_COLOR }}>
        {editable ? (
          <input className="label-editor" style={{ width: "100%" }} defaultValue={`${label}`} placeholder={"Type Option Label"} onChange={handleLabelChange} />
        ) : (
          <p className="label-display" style={{ wordBreak: "break-all" }}>
            {label}
          </p>
        )}
      </div>
    </div>
  );
}
const LIGHT_COLOR = "#aebdcb";
const DARK_COLOR = "#323d48";
const SELECTED_COLOR = "#f53b57";
function OuterCircle({ active }: { active?: boolean }) {
  return (
    <div style={{ color: active ? SELECTED_COLOR : LIGHT_COLOR, transition: "all .2s cubic-bezier(.4,.2,0,1)" }}>
      <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
      </svg>
    </div>
  );
}
function InnerCircle({ active }: { active?: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        color: active ? SELECTED_COLOR : LIGHT_COLOR,
        transform: active ? "scale(1)" : "scale(0)",
        transition: "all .2s cubic-bezier(.4,.2,0,1)",
      }}
    >
      <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path>
      </svg>
    </div>
  );
}
