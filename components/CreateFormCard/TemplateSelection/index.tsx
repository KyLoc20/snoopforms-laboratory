import { useState, useEffect } from "react";
import Switch from "@/lib/ui/Switch";
import FormOption from "../FormOption";
export type TemplateStatus = "default" | "unsure" | "none" | "selected";
type TemplateSelectionProps = {
  /**
   * @option "default" -> use DefaultTemplete;
   * @option "unsure" -> use Templete, need to browse to TemplatePage;
   * @option "none" -> DO NOT use
   */
  onChange: (templeate: TemplateStatus) => void;
};
export default function TemplateSelection({ onChange }: TemplateSelectionProps) {
  const [shouldUseTemplete, setShouldUseTemplete] = useState(false);
  const [shouldUseDefaultTemplete, setShouldDefaultTemplete] = useState(true);
  useEffect(() => {
    onChange(shouldUseTemplete ? (shouldUseDefaultTemplete ? "default" : "unsure") : "none");
  }, [shouldUseTemplete, shouldUseDefaultTemplete]);
  return (
    <div style={{}}>
      <div style={{ lineHeight: "20px", fontSize: "14px", fontWeight: 300, color: "#6b7177" }}>How would you like to start?</div>
      <div style={{ marginTop: "16px", display: "flex", width: "100%", justifyContent: "space-between" }}>
        <FormOption
          selected={!shouldUseTemplete}
          name="Start From Scratch"
          description="Get started with some basic elements."
          onSelect={() => setShouldUseTemplete(false)}
        />
        <FormOption
          selected={shouldUseTemplete}
          name="Use a Template"
          description="Choose a premade form and customize it."
          onSelect={() => setShouldUseTemplete(true)}
        />
      </div>
      <div style={{ marginTop: "24px", visibility: shouldUseTemplete ? "visible" : "hidden" }}>
        <Switch label={"Choose Default Template"} defaultValue={shouldUseDefaultTemplete} onChange={(v) => setShouldDefaultTemplete(v)} />
      </div>
    </div>
  );
}
