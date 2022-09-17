import { useState, useEffect, useRef, PropsWithChildren } from "react";
import TextField from "@/lib/snoopforms/react/questions/toolkit/ui/TextField";
import { NoCodeFormData } from "@/lib/types";
import { generateId } from "@/lib/utils";
import TypeSelection, { AvailableType } from "./TypeSelection";
import TemplateSelection, { TemplateStatus } from "./TemplateSelection";
import Button from "./Button";
export type { AvailableType };
export { generateInitialForm, generateDefaultTemplateForm };
export default function CreateFormCard({ onSubmit }: { onSubmit: (name: string, type: AvailableType, shoudUseDefaultTemplate: boolean) => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const refName = useRef<string>("");
  const refType = useRef<AvailableType>("nocode");
  const [templateStatus, setTemplateStatus] = useState<TemplateStatus>("none");
  const shouldCreateFormByTemplate = templateStatus === "unsure";
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
            } else setStep(2);
          }}
        >
          <TemplateSelection onChange={(v) => setTemplateStatus(v)}></TemplateSelection>
          <Button>{shouldCreateFormByTemplate ? "Explore Templates" : "Next"}</Button>
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
          <Button>Create</Button>
        </form>
      )}
    </div>
  );
}
const DEFAULT_FORM_NAME = "I Need A Name";
function Title({ children, description }: PropsWithChildren<{ description: string }>) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px",
        lineHeight: "28px",
        fontSize: "20px",
        color: "#6b7177",
        fontWeight: 700,
      }}
    >
      <span>{children}</span>
      <i style={{ fontSize: "14px", lineHeight: "16px", marginRight: "16px" }}>{description}</i>
    </div>
  );
}
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

const generateInitialForm = (formId: string, name: string): NoCodeFormData => ({
  formId,
  name,
  blocks: [],
  blocksDraft: [
    { id: generateId(10), type: "header", data: { text: "Welcome to Snoopforms Lab", level: 2 } },
    {
      id: generateId(10),
      type: "textQuestion",
      data: { _component: { placeholder: "Type Something Here", title: "Text Question", isRequired: false } },
    },
    {
      id: generateId(10),
      type: "pageTransition",
      data: { _component: { submitLabel: "Submit" } },
    },
    { id: generateId(10), type: "paragraph", data: { text: "Thanks a lot for your time and insights 🙏" } },
  ],
});
const generateDefaultTemplateForm = (formId: string, name: string): NoCodeFormData => ({
  formId,
  name,
  blocks: [],
  blocksDraft: [
    { id: generateId(10), type: "header", data: { text: "Welcome to Snoopforms Lab", level: 2 } },
    {
      id: generateId(10),
      type: "textQuestion",
      data: { _component: { placeholder: "Type Your Name Here", title: "May I know your name?", isRequired: false } },
    },
    {
      id: generateId(10),
      type: "multipleChoiceQuestion",
      data: {
        _component: {
          onlyOne: true,
          isRequired: false,
          options: [
            { label: "She/her", value: "She/her" },
            { label: "He/him", value: "He/him" },
            { label: "They/them", value: "They/them" },
            { label: "I prefer not to say", value: "I prefer not to say" },
          ],
          title: "What are your pronouns?",
        },
      },
    },
    {
      id: generateId(10),
      type: "pageTransition",
      data: { _component: { submitLabel: "Submit" } },
    },
    {
      id: generateId(10),
      type: "ratingQuestion",
      data: { _component: { num: 5, icon: "hearts", isRequired: false, title: "How do you like this stuff?" } },
    },
    {
      id: generateId(10),
      type: "emailQuestion",
      data: { _component: { placeholder: "Type Email Here", title: "May I have your email?", isRequired: false } },
    },
    { id: generateId(10), type: "paragraph", data: { text: "Thanks a lot for your time and insights 🙏" } },
  ],
});
