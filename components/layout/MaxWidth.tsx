import { PropsWithChildren } from "react";
export default function MaxWidth({ children, size, padding }: PropsWithChildren<{ size?: number; padding?: string }>) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexGrow: 1,
      }}
    >
      <div style={{ width: "100%", maxWidth: `${size ?? 1024}px`, padding: padding ?? "32px 24px" }}> {children}</div>
    </div>
  );
}
