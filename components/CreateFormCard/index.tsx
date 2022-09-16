import { useState, useEffect, useRef } from "react";
import TextField from "@/lib/snoopforms/react/questions/toolkit/ui/TextField";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { NoCodeFormData } from "@/lib/types";
import { generateId } from "@/lib/utils";
export { generateInitialForm };
export default function CreateFormCard({ onSubmit }: { onSubmit: (name: string, type: AvailableType) => void }) {
  const refName = useRef<string>("");
  const refType = useRef<AvailableType>("nocode");
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Title></Title>
      <form
        style={{ padding: "8px" }}
        onSubmit={(e) => {
          e.preventDefault();
          const formName = refName.current;
          const formType = refType.current;
          onSubmit(formName, formType);
        }}
      >
        <NameInput
          onChange={(v) => {
            if (refName.current) {
              refName.current = v;
            }
          }}
        ></NameInput>
        <TypeSelection
          onChange={(v) => {
            if (refType.current) {
              refName.current = v;
            }
          }}
        ></TypeSelection>
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
        <TextField onChange={onChange} placeholder="e.g. Customer Research Survey" debounceTimeout={500}></TextField>
      </div>
    </div>
  );
}
export type AvailableType = "code" | "nocode";
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
const generateInitialForm = (formId: string, name: string): NoCodeFormData => ({
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
