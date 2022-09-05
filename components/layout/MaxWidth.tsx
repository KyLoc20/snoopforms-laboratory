import { PropsWithChildren } from "react";
export default function MaxWidth({ children, size, padding, full }: PropsWithChildren<{ full?: boolean; size?: number | string; padding?: string }>) {
  // undefined -> no maxWidth, fill the container
  // string -> percentage
  // number -> px
  const computedSize = full ? undefined : typeof size === "string" ? size : `${size ?? 1024}px`;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexGrow: 1,
      }}
    >
      <div style={{ width: "100%", maxWidth: computedSize, padding: padding ?? "32px 24px" }}> {children}</div>
    </div>
  );
}
