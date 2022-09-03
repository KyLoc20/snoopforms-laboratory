import { PropsWithChildren, useState, useEffect } from "react";
import TextField from "@/lib/snoopforms/react/questions/toolkit/ui/TextField";
import { CheckCircleIcon } from "@heroicons/react/solid";

export default function CreateFormCard({ onSubmit }: { onSubmit: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Title></Title>
      <form
        style={{ padding: "8px" }}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <NameInput onChange={() => {}}></NameInput>
        <TypeSelection onChange={() => {}}></TypeSelection>
        <CreateButton></CreateButton>
      </form>
    </div>
  );
}
function Title({}) {
  return <div style={{ padding: "8px", lineHeight: "28px", fontSize: "20px", color: "#6b7177", fontWeight: 700 }}>Create A New Form</div>;
}
function NameInput({ onChange }: { onChange: (v: string) => void }) {
  return (
    <div style={{}}>
      <div style={{ lineHeight: "20px", fontSize: "14px", fontWeight: 300, color: "#6b7177" }}>Name your form</div>
      <div style={{ margin: "8px 0 24px" }}>
        <TextField onChange={onChange} placeholder="e.g. Customer Research Survey"></TextField>
      </div>
    </div>
  );
}
type AvailableType = "code" | "nocode";
function TypeSelection({ onChange }: { onChange: (v: AvailableType) => void }) {
  const [which, setWhich] = useState<AvailableType>("nocode");
  useEffect(() => {
    onChange(which);
  }, [which]);
  return (
    <div style={{}}>
      <div style={{ lineHeight: "20px", fontSize: "14px", fontWeight: 300, color: "#6b7177" }}>How do you build your form?</div>
      <div style={{ marginTop: "16px", display: "flex", width: "100%", justifyContent: "space-between" }}>
        <FormType
          selected={which === "nocode"}
          name="No-Code Builder"
          description="Use the Notion-like builder to build your form without a single line of code."
          onSelect={() => setWhich("nocode")}
        ></FormType>
        <FormType
          selected={which === "code"}
          name="Code"
          description="Use the snoopReact library to code the form yourself and manage the data here."
          onSelect={() => setWhich("code")}
        ></FormType>
      </div>
    </div>
  );
}
function FormType({ selected, name, description, onSelect }: { selected: boolean; name: string; description: string; onSelect: () => void }) {
  return (
    <div
      onClick={onSelect}
      style={{
        cursor: "pointer",
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
function CreateButton({}) {
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
      Create
    </button>
  );
}
function UnselectedIcon({}) {
  return <div style={{ margin: "2px", width: "16px", height: "16px", borderRadius: "50%", border: "2px solid #e5eaef" }}></div>;
}
function SelectedIcon({}) {
  return <CheckCircleIcon style={{ width: "20px", height: "20px", color: "rgba(245,59,87,1)" }}></CheckCircleIcon>;
}
