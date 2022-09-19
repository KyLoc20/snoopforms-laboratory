import { useState, PropsWithChildren } from "react";
export function SubmitButton({ children }: PropsWithChildren<{}>) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <button
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      type="submit"
      style={{
        background: isHovering ? "rgba(245,59,87,1)" : "rgba(245,59,87,0.8)",
        transition: "all .2s cubic-bezier(.4,.2,0,1)",
        color: "white",
        marginTop: "24px",
        borderRadius: "8px",
        padding: "12px 20px",
        lineHeight: "24px",
        width: "100%",
        textAlign: "center",
      }}
    >
      {children}
    </button>
  );
}
export function Button({ children, onClick, width, theme }: PropsWithChildren<{ onClick?: () => void; width?: number; theme?: "gray" | "red" }>) {
  const [isHovering, setIsHovering] = useState(false);
  const bg = (theme ?? "gray") === "red" ? "rgba(245,59,87,0.8)" : "rgba(64,81,100,1)";
  const bgHover = (theme ?? "gray") === "red" ? "rgba(245,59,87,1)" : "rgba(50,61,72,1)";
  return (
    <button
      onClick={() => {
        onClick?.();
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: width ? `${width}px` : "100%",
        background: isHovering ? bgHover : bg,
        transition: "all .2s cubic-bezier(.4,.2,0,1)",
        color: "white",
        borderRadius: "8px",
        padding: "12px 20px",
        lineHeight: "24px",
        textAlign: "center",
        margin: "0 8px",
      }}
    >
      {children}
    </button>
  );
}
