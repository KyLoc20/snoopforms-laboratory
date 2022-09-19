import { useState, useEffect } from "react";
import { FormOption } from "../widgets";
export type AvailableType = "code" | "nocode";
export default function TypeSelection({ onChange }: { onChange: (v: AvailableType) => void }) {
  const [which, setWhich] = useState<AvailableType>("nocode");
  useEffect(() => {
    onChange(which);
  }, [which]);
  return (
    <div style={{}}>
      <div style={{ lineHeight: "20px", fontSize: "14px", fontWeight: 300, color: "#6b7177" }}>How do you build your form?</div>
      <div style={{ marginTop: "16px", display: "flex", width: "100%", justifyContent: "space-between" }}>
        <FormOption
          selected={which === "nocode"}
          name="No-Code Builder"
          description="Use the Notion-like builder to build your form without a single line of code."
          onSelect={() => setWhich("nocode")}
        />
        <FormOption
          disabled
          selected={which === "code"}
          name="Code"
          description="Use the snoopReact library to code the form yourself and manage the data here."
          onSelect={() => setWhich("code")}
        />
      </div>
    </div>
  );
}
