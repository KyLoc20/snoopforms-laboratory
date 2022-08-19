import { PropsWithChildren, useRef, useState } from "react";
import { FORM_RED, FORM_GRAY_1, FORM_GRAY_LIGHT, withAlpha } from "../../base/design";
const TRANSITION = "all .2s cubic-bezier(.4,.2,0,1)";
const TEXT_COLOR = withAlpha(FORM_GRAY_1, 0.7); //"rgba(0, 0, 0, 0.87)";
const TEXT_LIGHT_COLOR = withAlpha(FORM_GRAY_1, 0.4); //"rgba(0, 0, 0, 0.54)";
const LINE_COLOR = TEXT_COLOR; //"rgba(0, 0, 0, 0.42)";
const LINE_COLOR_H = TEXT_COLOR; //"rgba(0, 0, 0, 0.87)";
const FOCUS_COLOR = FORM_RED; //"rgba(25, 118, 210, 1)";
const SELECT_GLOBAL_STYLES = `
    .snoopforms-select-wrapper input{
        padding: 0;
        border: none;
        cursor: inherit;
        user-select: none;
    }
    .snoopforms-select-wrapper input:focus{
      outline: none; 
      border: none;
      box-shadow: none;
  }
`;
export default function Select({ label, reminder, options, onChange, width }: TSelect) {
  const [value, setValue] = useState<string>("");
  const [isHovering, setIsHovering] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const refInput = useRef<HTMLInputElement>(null);
  const hasSelection = value !== "";
  const shouldMoveLabel = hasSelection || isFocused;
  const handleSelect = (value: string) => {
    setIsMenuOpen(false);
    setValue(value);
    onChange(value);
    const elInput = refInput.current;
    if (elInput) {
      elInput.blur();
    }
  };
  // console.log("REDNER Select", isFocused);
  return (
    <>
      <div
        className="snoopforms-select-wrapper"
        style={{ display: "inline-flex", flexDirection: "column" }}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <label
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onMouseDown={() => {
            setIsMenuOpen(true);
          }}
          style={{
            position: "relative",
            display: "flex",
            padding: "20px 24px 5px 0",
            boxSizing: "content-box",
            cursor: "pointer",
          }}
        >
          <input
            ref={refInput}
            type="text"
            size={5}
            style={{
              width: toLength(width),
              minWidth: "56px",
              lineHeight: "23px",
              color: "transparent",
              background: "transparent",
              fontSize: "16px",
              fontWeight: 400,
            }}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
          />
          <div
            className="select-value"
            style={{ position: "absolute", color: hasSelection ? TEXT_COLOR : "transparent", top: "23px", fontSize: "16px", fontWeight: 400 }}
          >
            {value}
          </div>
          <Label shouldMoveLabel={shouldMoveLabel}>{label.trim()}</Label>
          <Toggle isFocused={isFocused}></Toggle>
          <BaseBottomLine isHovering={isHovering}></BaseBottomLine>
          <FocusBottomLine isFocused={isFocused}></FocusBottomLine>
          {isMenuOpen && (
            <div
              className="select-menu"
              style={{
                maxHeight: "196px",
                overflowY: "auto",
                position: "absolute",
                zIndex: 100,
                // display: isMenuOpen ? "flex" : "none",
                display: "flex",
                flexDirection: "column",
                top: "100%",
                width: "100%",
                background: "#fff",
                padding: "8px 0",
                boxShadow: "0 5px 5px -3px rgb(0 0 0 / 10%), 0 8px 10px 1px rgb(0 0 0 / 7%), 0 3px 14px 2px rgb(0 0 0 / 6%)",
              }}
            >
              <div
                className="mask-layer"
                style={{ position: "fixed", top: 0, right: 0, bottom: 0, left: 0, cursor: "default", zIndex: "-10" }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsMenuOpen(false);
                  setIsHovering(false);
                  const elInput = refInput.current;
                  if (elInput) {
                    elInput.blur();
                  }
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                }}
              ></div>
              {options.map((option, i) => (
                //   <MenuItem key={i} value={option.value ?? option.name} onSelect={handleSelect}>
                <MenuItem key={i} value={option.name} onSelect={handleSelect}>
                  {option.name}
                </MenuItem>
              ))}
            </div>
          )}
        </label>
        <Reminder>{reminder}</Reminder>
      </div>
      <style>{SELECT_GLOBAL_STYLES}</style>
    </>
  );
}
type TSelect = {
  label: string;
  reminder?: string;
  width?: string | number;
  options: { name: string; value?: string }[];
  onChange: (value: string) => void;
};
const toLength = (v: string | number | undefined) => (v === undefined ? v : typeof v === "number" ? `${v}px` : v);
// type TSelect<V = string> = {
//   label: string;
//   options: { name: string; value?: V }[];
// };
function MenuItem({ children, value, onSelect }: PropsWithChildren<{ onSelect: (value: string) => void; value: string }>) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      onMouseEnter={() => {
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSelect(value);
      }}
      style={{
        userSelect: "none",
        cursor: "pointer",
        padding: "6px 16px",
        color: TEXT_COLOR,
        background: isHovering ? "rgba(0,0,0,0.04)" : undefined,
        fontSize: "16px",
        fontWeight: 400,
      }}
    >
      {children}
    </div>
  );
}
function Label({ children, shouldMoveLabel }: PropsWithChildren<{ shouldMoveLabel: boolean }>) {
  return (
    <div
      className="select-label"
      style={{
        position: "absolute",
        top: "24px",
        transform: shouldMoveLabel ? "translateY(calc(-100% - 8px)) translateX(-10%) scale(0.8)" : undefined,
        transition: TRANSITION,
        color: TEXT_LIGHT_COLOR,
        // textTransform: "capitalize",
        lineHeight: "16px",
        fontSize: "16px",
        fontWeight: 400,
      }}
    >
      {children}
    </div>
  );
}
function Reminder({ children }: PropsWithChildren<{}>) {
  return (
    <div
      className="select-reminder"
      style={{ userSelect: "none", lineHeight: "18px", padding: "3px 4px 0", color: TEXT_LIGHT_COLOR, fontSize: "12px", fontWeight: 400 }}
    >
      {children}
    </div>
  );
}
function BaseBottomLine({ isHovering }: PropsWithChildren<{ isHovering: boolean }>) {
  return (
    <div
      className="base-bottom-line"
      style={{
        position: "absolute",
        bottom: "0",
        height: isHovering ? "2px" : "1px",
        width: "100%",
        background: isHovering ? LINE_COLOR_H : LINE_COLOR,
        transition: TRANSITION,
      }}
    ></div>
  );
}
function FocusBottomLine({ isFocused }: PropsWithChildren<{ isFocused: boolean }>) {
  return (
    <div
      className="focus-bottom-line"
      style={{
        position: "absolute",
        bottom: "0",
        height: "2px",
        width: "100%",
        background: FOCUS_COLOR,
        transition: TRANSITION,
        transform: isFocused ? "scaleX(1)" : "scaleX(0)",
      }}
    ></div>
  );
}

function Toggle({ isFocused }: PropsWithChildren<{ isFocused: boolean }>) {
  return (
    <div
      className="select-toggle"
      style={{
        position: "absolute",
        top: "20px",
        right: "0",
        transform: isFocused ? "rotate(180deg)" : undefined,
        transition: TRANSITION,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg style={{ fill: TEXT_COLOR }} focusable="false" viewBox="0 0 24 24" width={24} height={24}>
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
      </svg>
    </div>
  );
}
