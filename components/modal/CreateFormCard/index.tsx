import { useState, useRef } from "react";
import TextField from "@/lib/snoopforms/react/questions/toolkit/ui/TextField";
import TypeSelection, { AvailableType } from "./TypeSelection";
import TemplateSelection, { TemplateStatus } from "./TemplateSelection";
import { Title, SubmitButton } from "../widgets";
import { useRouter } from "next/router";
export type { AvailableType };

export default function CreateFormCard({ fromTemplate, onSubmit, onBrowseTemplates }: CreateFormCardProps) {
  /**
   * step 1: options about template
   * step 2: options about formName
   * if fromTemplate is true, go to set formName directly
   */
  const [step, setStep] = useState<1 | 2>(fromTemplate ? 2 : 1);
  const refName = useRef<string>("");
  const refType = useRef<AvailableType>("nocode");
  const [templateStatus, setTemplateStatus] = useState<TemplateStatus>(fromTemplate ? "selected" : "none");
  const shouldCreateFormByTemplate = templateStatus === "unsure";
  const router = useRouter();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Title description={`${step}/2`}>Create A New Form</Title>
      {step === 1 && (
        <form
          style={{ padding: "8px", height: "340px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          onSubmit={(e) => {
            e.preventDefault();
            if (shouldCreateFormByTemplate) {
              //Go to TemplatePage, not create form here
              // router.push("/templates");
              onBrowseTemplates();
            } else setStep(2);
          }}
        >
          <TemplateSelection onChange={(v) => setTemplateStatus(v)}></TemplateSelection>
          <SubmitButton>{shouldCreateFormByTemplate ? "Explore Templates" : "Next"}</SubmitButton>
        </form>
      )}
      {step === 2 && (
        <form
          style={{ padding: "8px", height: "340px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          onSubmit={(e) => {
            e.preventDefault();
            const formName = refName.current;
            const formType = refType.current;
            const shoudUseDefaultTemplate = templateStatus === "default";
            onSubmit(formName || DEFAULT_FORM_NAME, formType, shoudUseDefaultTemplate);
          }}
        >
          <NameInput
            onChange={(v) => {
              refName.current = v;
            }}
          ></NameInput>
          <TypeSelection
            onChange={(v) => {
              refType.current = v;
            }}
          ></TypeSelection>
          <SubmitButton>Create</SubmitButton>
        </form>
      )}
    </div>
  );
}
const DEFAULT_FORM_NAME = "I Need A Name";
type CreateFormCardProps = {
  onBrowseTemplates: () => void;
  onSubmit: (name: string, type: AvailableType, shoudUseDefaultTemplate: boolean) => void;
  fromTemplate?: boolean;
};

function NameInput({ onChange }: { onChange: (v: string) => void }) {
  return (
    <div style={{}}>
      <div style={{ lineHeight: "20px", fontSize: "14px", fontWeight: 300, color: "#6b7177" }}>Name your form</div>
      <div style={{ margin: "8px 0 24px" }}>
        <TextField onChange={onChange} placeholder="e.g. Customer Research Survey" debounceTimeout={0}></TextField>
      </div>
    </div>
  );
}
