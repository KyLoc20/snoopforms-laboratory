import { useState } from "react";
import styles from "./AddPage.module.css";
export default function AddPageButton({ onClick }: { onClick: () => void }) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div className={styles.wrapper} style={{ position: "fixed", right: "24px", bottom: "24px", zIndex: 1000 }}>
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          background: isHovering ? "rgba(245,59,87,0.8)" : "rgba(245,59,87,0.6)",
          color: "white",
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          margin: "8px",
          boxShadow: "rgba(245,59,87,0.3) 0px 4px 20px 0px",
          transition: "all .2s cubic-bezier(.4,.2,0,1)",
        }}
      >
        <svg width={20} height={20} viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
      </button>
    </div>
  );
}
