import { CheckCircleIcon } from "@heroicons/react/solid";
export default function FormOption({
  selected,
  name,
  description,
  onSelect,
  disabled,
}: {
  selected: boolean;
  name: string;
  description: string;
  onSelect: () => void;
  disabled?: boolean;
}) {
  return (
    <div
      onClick={() => {
        if (!disabled) onSelect();
      }}
      style={{
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.5 : 1,
        width: "216px",
        height: "126px",
        display: "flex",
        alignItems: "flex-start",
        borderRadius: "8px",
        padding: "16px",
        border: `1px solid #d2dae2`,
        background: "#fafafb",
        boxShadow: selected ? "0 0 0 3px rgba(245,59,87,1)" : "",
        userSelect: "none",
      }}
    >
      <div>
        <div style={{ lineHeight: "24px", fontSize: "16px", color: "#6b7177", fontWeight: 700, whiteSpace: "nowrap" }}>{name}</div>
        <p style={{ marginTop: "4px", lineHeight: "16px", fontSize: "12px", color: "#6b7177" }}>{description}</p>
      </div>
      <div>{selected ? <SelectedIcon /> : <UnselectedIcon />}</div>
    </div>
  );
}
function UnselectedIcon({}) {
  return <div style={{ margin: "2px", width: "16px", height: "16px", borderRadius: "50%", border: "2px solid #e5eaef" }}></div>;
}
function SelectedIcon({}) {
  return <CheckCircleIcon style={{ width: "20px", height: "20px", color: "rgba(245,59,87,1)" }}></CheckCircleIcon>;
}
