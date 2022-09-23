import { PropsWithChildren } from "react";
export default function Chip({ label, hegiht, padding, fontSize }: PropsWithChildren<{ label: string; hegiht?: number; padding?: string; fontSize?: string }>) {
  const _height = hegiht ?? 28;
  const _padding = padding ?? "0 8px";
  const _fontSize = fontSize ?? "14px";

  return (
    <div
      style={{
        userSelect: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: _padding,
        height: `${_height}px`,
        borderRadius: `${_height / 2}px`,
        color: "rgba(64, 81, 100,1)",
        border: "1px solid rgba(64, 81, 100,0.8)",
        fontSize: _fontSize,
        fontWeight: 400,
      }}
    >
      {label}
    </div>
  );
}
