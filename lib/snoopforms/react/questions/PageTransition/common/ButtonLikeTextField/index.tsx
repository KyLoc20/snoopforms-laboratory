import { ChangeEvent, PropsWithChildren, useState } from "react";
import { FORM_GRAY_1, FORM_GRAY_2 } from "../../../toolkit/base/design";
import { debounce } from "lodash";
export default function ButtonLikeTextField({ defaultValue, onChange }: { defaultValue: string; onChange: (value: string) => void }) {
  const [isHovering, setIsHovering] = useState(false);
  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const newlyValue = e.target.innerText;
    //BUG every time it updates, the cursor resets
    onChange(newlyValue);
  }, 1200);
  return (
    <div
      contentEditable
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ fontSize: "14px", padding: "12px 16px", borderRadius: "16px", background: isHovering ? FORM_GRAY_2 : FORM_GRAY_1, color: "white" }}
      defaultValue={defaultValue}
      onInput={handleChange}
    >
      {defaultValue}
    </div>
  );
}
