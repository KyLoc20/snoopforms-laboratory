import { useEffect, useState, PropsWithChildren } from "react";
export default function ScoreList({
  num,
  bestText,
  worstText,
  onChange,
  defaultValue,
}: {
  num: number;
  bestText: string;
  worstText: string;
  defaultValue?: number;
  onChange?: (v: number) => void;
}) {
  const [curValue, setCurValue] = useState(defaultValue ?? -1);
  const handleSelect = (value: number) => {
    setCurValue(value);
    onChange?.(value);
  };
  return (
    <div style={{ display: "inline-flex", flexWrap: "nowrap", position: "relative", marginBottom: "36px" }}>
      {Array(num)
        .fill(0)
        .map((_, indexAsValue) => (
          <ScoreRadio key={indexAsValue} value={indexAsValue} active={indexAsValue === curValue} onSelect={handleSelect} />
        ))}
      <WorstIndicator>{worstText}</WorstIndicator>
      <BestIndicator>{bestText}</BestIndicator>
    </div>
  );
}
function BestIndicator({ children }: PropsWithChildren<{}>) {
  return <div style={{ right: "2px", bottom: "-36px", position: "absolute", lineHeight: "24px" }}>{children}</div>;
}
function WorstIndicator({ children }: PropsWithChildren<{}>) {
  return <div style={{ left: "2px", bottom: "-36px", position: "absolute", lineHeight: "24px" }}>{children}</div>;
}
export function ScoreRadio({ value, active, onSelect }: { value: number; active: boolean; onSelect: (value: number) => void }) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      style={{
        display: "inline-flex",
        flexShrink: 0,
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        userSelect: "none",
        width: "28px",
        height: "64px",
        lineHeight: "28px",
        fontSize: "20px",
        borderRadius: "4px",
        color: "rgba(64, 81, 100,1)",
        border: "1px solid rgba(64, 81, 100,0.8)",
        background: active ? "rgba(64, 81, 100,0.3)" : isHovering ? "rgba(64, 81, 100,0.2)" : "rgba(64, 81, 100,0.05)",
        transition: "all .2s cubic-bezier(.4,.2,0,1)",
        margin: "0 3px",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => onSelect(value)}
    >
      {value}
    </div>
  );
}
