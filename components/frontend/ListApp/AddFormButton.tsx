import { PropsWithChildren, useState } from "react";
import { PlusIcon } from "@heroicons/react/outline";

export default function AddFormButton({ onClick }: PropsWithChildren<{ onClick: () => void }>) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
      className="add-form-button"
      style={{
        cursor: "pointer",
        boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)",
        background: isHovering ? "rgba(245,59,87,1)" : "rgba(245,59,87,0.8)",
        width: "176px",
        height: "224px",
        borderRadius: "16px",
        transition: "all .2s cubic-bezier(.4,.2,0,1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        padding: "56px",
      }}
    >
      <PlusIcon style={{ width: "56px", height: "56px", margin: "0 4px" }} />
      <span style={{ textAlign: "center" }}>create form</span>
    </div>
  );
}
