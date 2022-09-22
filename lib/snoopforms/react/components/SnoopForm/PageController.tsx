import React, { useState, PropsWithChildren } from "react";
export default function PageController({
  onPrev,
  onNext,
  isFirstPage,
  isLastPage,
}: {
  onPrev: () => void;
  onNext: () => void;
  isFirstPage: boolean;
  isLastPage: boolean;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        justifyContent: "flex-end",
        alignItems: "center",
        position: "absolute",
        height: "65px",
        padding: "0 16px 20px",
        right: 0,
        bottom: 0,
        zIndex: 10,
      }}
    >
      <GroupButton position="left" onClick={onPrev} disabled={isFirstPage}>
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </GroupButton>
      <div style={{ height: "32px", width: "1px", background: "rgba(245,59,87,0.5)" }}></div>
      <GroupButton position="right" onClick={onNext} disabled={isLastPage}>
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </GroupButton>
    </div>
  );
}
function GroupButton({ position, onClick, disabled, children }: PropsWithChildren<{ position?: "left" | "right"; onClick?: () => void; disabled?: boolean }>) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      onClick={() => {
        if (!disabled) onClick?.();
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        cursor: disabled ? "default" : "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "34px",
        height: "32px",
        color: disabled ? "rgba(255,255,255,0.5)" : "#fff",
        borderTopLeftRadius: position === "left" ? "4px" : undefined,
        borderTopRightRadius: position === "right" ? "4px" : undefined,
        borderBottomRightRadius: position === "right" ? "4px" : undefined,
        borderBottomLeftRadius: position === "left" ? "4px" : undefined,
        background: disabled ? "rgba(245,59,87,0.8)" : isHovering ? "rgba(245,59,87,1)" : "rgba(245,59,87,0.8)",
        transition: "all .2s cubic-bezier(.4,.2,0,1)",
      }}
    >
      {children}
    </div>
  );
}
