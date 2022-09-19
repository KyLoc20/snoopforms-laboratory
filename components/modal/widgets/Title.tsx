import { PropsWithChildren } from "react";
export default function Title({ children, description }: PropsWithChildren<{ description?: string }>) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px",
        lineHeight: "28px",
        fontSize: "20px",
        color: "#6b7177",
        fontWeight: 700,
      }}
    >
      <span>{children}</span>
      <i style={{ fontSize: "14px", lineHeight: "16px", marginRight: "16px" }}>{description}</i>
    </div>
  );
}
