import { useLayoutEffect, useEffect, useState, useRef } from "react";
import { FORM_RED, FORM_GRAY_1, FORM_GRAY_LIGHT, withAlpha } from "../../base/design";
const TRACK_TRANSITION = "background .2s cubic-bezier(.4,.2,0,1)";
const THUMB_TRANSITION = "left .25s cubic-bezier(.4,.2,0,1)";
const LABEL_COLOR = FORM_GRAY_1;
const THUMB_BOXSHADOW_HOVER = withAlpha(FORM_RED, 0.9);
const THUMB_COLOR = "#ffffff";
const THUMB_BOXSHADOW =
  "rgba(255,255,255,1) 0px 0px 0px 0px, rgba(12,180,235,0.5) 0px 0px 0px 0px, rgba(0,0,0,0.1) 0px 1px 3px 0px, rgba(0,0,0,0.1) 0px 1px 2px -1px";
const TRACK_COLOR = FORM_GRAY_LIGHT;
const TRACK_COLOR_ACTIVE = FORM_RED;
export default function Switch({ defaultValue, onChange, label }: { onChange: (value: boolean) => void; label?: string; defaultValue?: boolean }) {
  const [isChecked, setIsChecked] = useState(defaultValue ?? false);
  const firstTimeRender = useRef(true);
  useEffect(() => {
    if (firstTimeRender.current) {
      firstTimeRender.current = false;
    } else {
      onChange(isChecked);
    }
  }, [isChecked]);

  return (
    <div className="mymui-select" style={{ display: "inline-flex", alignItems: "center" }} onClick={() => setIsChecked((prev) => !prev)}>
      <DumbSwitch active={isChecked}></DumbSwitch>
      <div style={{ marginLeft: "12px", fontWeight: 500, fontSize: "14px", color: LABEL_COLOR, userSelect: "none" }}>{label}</div>
    </div>
  );
}
function DumbSwitch({ active, onChange }: { active: boolean; onChange?: () => void }) {
  // const [isHovering, setIsHovering] = useState(false);
  const thumbLeft = active ? "14px" : "2px";
  // const thumbBoxShadow = isHovering ? `0 0 2px 3px ${THUMB_HOVER_SHADOW}` : "";
  return (
    <>
      <div
        className="toggle-track"
        // onMouseEnter={() => setIsHovering(true)}
        // onMouseLeave={() => setIsHovering(false)}
        // onClick={onChange}
        style={{
          cursor: "pointer",
          userSelect: "none",
          width: "28px", //"50px",
          height: "16px", //"24px",
          borderRadius: "8px",
          padding: "2px",
          background: active ? TRACK_COLOR_ACTIVE : TRACK_COLOR,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          transition: TRACK_TRANSITION,
        }}
      >
        <div
          className="toggle-thumb"
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: THUMB_COLOR,
            position: "absolute",
            left: thumbLeft,
            top: "2px",
            transition: THUMB_TRANSITION,
            boxShadow: THUMB_BOXSHADOW,
          }}
        ></div>
      </div>
    </>
  );
}
