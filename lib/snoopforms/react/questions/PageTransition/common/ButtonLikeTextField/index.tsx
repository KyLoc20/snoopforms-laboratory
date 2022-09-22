import { ChangeEvent, PropsWithChildren, useState, useEffect } from "react";
import { FORM_GRAY_1, FORM_GRAY_2 } from "../../../toolkit/base/design";
export default function ButtonLikeTextField({ defaultValue, onChange }: { defaultValue: string; onChange: (value: string) => void }) {
  const [value, setValue] = useState(defaultValue);
  const [isHovering, setIsHovering] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newlyValue = e.target.value;
    setValue(newlyValue);
  };
  useEffect(() => {
    onChange(value);
  }, [value]);
  return (
    <>
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="button-like-textfield"
        style={{
          display: "inline-flex",
          position: "relative",
          fontSize: "14px",
          lineHeight: "20px",
          padding: "0 16px",
          borderRadius: "16px",
          background: isHovering ? FORM_GRAY_2 : FORM_GRAY_1,
          color: "white",
        }}
      >
        <input
          style={{
            top: "12px",
            left: 0,
            width: "100%",
            paddingLeft: "16px",
            lineHeight: "20px",
            fontSize: "14px",
            color: "transparent",
            caretColor: "white",
            position: "absolute",
          }}
          value={value}
          onChange={handleChange}
        />
        <div
          style={{
            overflow: "hidden",
            pointerEvents: "none",
            maxWidth: "384px",
            height: "44px",
            margin: "0 -16px",
            padding: "12px 16px",
            lineHeight: "20px",
            fontSize: "14px",
            color: "white",
            whiteSpace: "pre",
          }}
        >
          {`${value}`}
        </div>
      </div>
    </>
  );
}
