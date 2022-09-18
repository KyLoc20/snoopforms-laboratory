import { useState, PropsWithChildren } from "react";
import { PlusIcon } from "@heroicons/react/outline";

import styles from "./TopBar.module.css";
export default function Button({ onClick, children }: PropsWithChildren<{ onClick: () => void }>) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div className={styles.button} style={{ height: "100%" }}>
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={onClick}
        style={{
          width: "160px",
          cursor: "pointer",
          height: "100%",
          background: isHovering ? "#f53b57" : "#fafafb",
          color: isHovering ? "white" : "#6b7177",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 24px",
          borderRight: "1px solid #e5eaef",
          transition: "all .2s cubic-bezier(.4,.2,0,1)",
          fontSize: "14px",
          lineHeight: "16px",
          fontWeight: 500,
        }}
      >
        {children}
      </div>
    </div>
  );
}
