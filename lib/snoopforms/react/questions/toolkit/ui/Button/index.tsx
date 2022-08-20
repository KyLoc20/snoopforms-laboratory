import { MouseEventHandler, PropsWithChildren, useState } from "react";
import { FORM_GRAY_1, FORM_GRAY_2, FORM_GRAY_LIGHT } from "../../base/design";
import styles from "./style.module.css";
interface ButtonProps {
  submittable?: boolean;
  variant?: "outlined" | "contained";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export default function Button({ children, variant, submittable, onClick }: PropsWithChildren<ButtonProps>) {
  const [isHovering, setIsHovering] = useState(false);
  const which = variant ?? "outlined";
  if (which === "outlined") {
    return (
      <button
        type={submittable ? "submit" : "button"}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={onClick}
        className="shadow-sm justify-center inline-flex items-center border font-medium hover:bg-gray-50"
        style={{
          fontSize: "12px",
          marginTop: "8px",
          padding: "6px 10px",
          borderRadius: "8px",
          borderColor: FORM_GRAY_LIGHT,
          color: FORM_GRAY_1,
          background: isHovering ? "#f6f8f9" : "white",
        }}
      >
        {children}
      </button>
    );
  } else if (which === "contained") {
    return (
      <button
        type="submit"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={onClick}
        className="shadow-sm justify-center inline-flex items-center font-medium cursor-pointer"
        style={{ fontSize: "14px", padding: "12px 16px", borderRadius: "16px", background: isHovering ? FORM_GRAY_2 : FORM_GRAY_1, color: "white" }}
      >
        {children}
      </button>
    );
  } else {
    throw Error("Unknown Button Variant: ", which);
  }
}
