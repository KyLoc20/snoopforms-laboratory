import { useState, PropsWithChildren } from "react";
export default function Button({ children }: PropsWithChildren<{}>) {
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
