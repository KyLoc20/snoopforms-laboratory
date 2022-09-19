import { PropsWithChildren } from "react";
export default function Description({ children }: PropsWithChildren<{ description?: string }>) {
  return (
    <p
      style={{
        padding: "8px",
        lineHeight: "20px",
        fontSize: "14px",
        fontWeight: 300,
        color: "#6b7177",
      }}
    >
      {children}
    </p>
  );
}
