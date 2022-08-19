import { useLayoutEffect, useEffect, useState, useRef } from "react";
export default function Switch({ defaultValue, onChange }: { onChange: (value: boolean) => void; label?: string; defaultValue?: boolean }) {
  const [isChecked, setIsChecked] = useState(defaultValue ?? false);
  const firstTimeRender = useRef(true);
  useEffect(() => {
    /**
     * Warning: useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and  To avoid this, useLayoutEffect should only be used in components that render exclusively on the client. See https://reactjs.org/link/uselayouteffect-ssr for common fixes.
     */
    // useLayoutEffect(() => {
    if (firstTimeRender.current) {
      firstTimeRender.current = false;
    } else {
      console.log("Switch Update", isChecked);
      onChange(isChecked);
    }
  }, [isChecked]);

  return (
    <div className="mymui-select" style={{ display: "inline-flex" }}>
      <DumbSwitch active={isChecked} onChange={() => setIsChecked((prev) => !prev)}></DumbSwitch>
    </div>
  );
}
function DumbSwitch({ active, onChange }: { active: boolean; onChange: () => void }) {
  const [isHovering, setIsHovering] = useState(false);
  const thumbLeft = active ? "1px" : "27px";
  const thumbBoxShadow = isHovering ? "0 0 2px 3px #25c2a0" : "";
  return (
    <>
      <div
        className="toggle-track"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={onChange}
        style={{
          cursor: "pointer",
          userSelect: "none",
          width: "50px",
          height: "24px",
          borderRadius: "12px",
          padding: "0 2px 1px 3px",
          background: "#4D4D4D",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div
          className="toggle-thumb"
          style={{
            width: "22px",
            height: "22px",
            border: "1px solid #4d4d4d",
            borderRadius: "50%",
            background: "#FAFAFA",
            position: "absolute",
            left: thumbLeft,
            top: "1px",
            transition: "250ms",
            boxShadow: thumbBoxShadow,
          }}
        ></div>
      </div>
    </>
  );
}
