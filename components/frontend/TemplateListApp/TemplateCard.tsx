import { useState, CSSProperties, PropsWithChildren, MouseEventHandler } from "react";
import { TerminalIcon as CodeIcon, ViewGridAddIcon as NoCodeIcon, DotsHorizontalIcon as MoreIcon, TrashIcon, EyeIcon } from "@heroicons/react/outline";
import Link from "next/link";

interface TemplateCardProps {
  id: string;
  name: string;
  // onSetDefault: (name: string) => void;
  onUse: (templateId: string) => void;
}
export default function TemplateCard({ id, name, onUse }: TemplateCardProps) {
  const templateHref = `/templates/${id}`;
  return (
    <CardWrapper>
      <Link href={templateHref}>
        <a style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ padding: "24px" }}>
            <FormName name={name}></FormName>
          </div>
          <div style={{ display: "flex", padding: "0 16px", marginBottom: "8px" }}>
            <FormType type={"nocode"}></FormType>
          </div>
        </a>
      </Link>
      <ControlPanel>
        <UseButton
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onUse(id);
          }}
        />
        <PreviewButton toWhere={templateHref} />
      </ControlPanel>
    </CardWrapper>
  );
}
type AvailableFormType = "nocode" | "code";
function FormType({ type }: { type: AvailableFormType }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderRadius: "4px",
        padding: "4px 8px",
        lineHeight: "20px",
        color: "#6b7177",
        background: "#e5eaef",
        fontSize: "14px",
      }}
    >
      {type === "nocode" ? (
        <>
          <NoCodeIcon style={{ width: "16px", height: "16px", margin: "2px 4px 2px 0" }} />
          No-Code
        </>
      ) : (
        <>
          <CodeIcon style={{ width: "16px", height: "16px", margin: "2px 4px 2px 0" }} />
          Code
        </>
      )}
    </div>
  );
}
function FormName({ name }: { name: string }) {
  return (
    <p
      style={{
        ...lineClamps(28, 3),
        fontSize: "18px",
      }}
    >
      {name}
    </p>
  );
}
function ControlPanel({ children }: PropsWithChildren<{}>) {
  return (
    <div
      style={{
        cursor: "default",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 24px",
        borderTop: "1px solid #e5eaef",
        color: "#b5bfc8",
        fontSize: "12px",
        lineHeight: "16px",
      }}
    >
      {children}
    </div>
  );
}

function CardWrapper({ children }: PropsWithChildren<{}>) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="form-card"
      style={{
        cursor: "pointer",
        boxShadow: isHovering ? "0 2px 4px rgba(0,0,0,0.08), 0 2px 12px rgba(0,0,0,0.06)" : "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)",
        background: "white",
        width: "176px",
        height: "224px",
        borderRadius: "16px",
        transition: "all .2s cubic-bezier(.4,.2,0,1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {children}
    </div>
  );
}
function PreviewButton({ toWhere }: { toWhere: string }) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Link href={toWhere}>
      <a
        style={{ cursor: "pointer", padding: "8px", margin: "-8px", transition: "all .2s cubic-bezier(.4,.2,0,1)", color: isHovering ? "#f53b57" : "" }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <EyeIcon style={{ width: "20px", height: "20px" }}></EyeIcon>
      </a>
    </Link>
  );
}
function UseButton({ onClick }: { onClick: MouseEventHandler }) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        margin: "0 -8px",
        padding: "4px 8px",
        transition: "all .4s cubic-bezier(.4,.2,0,1)",
        borderRadius: "6px",
        background: isHovering ? "#f53b57" : "",
        color: isHovering ? "#fff" : undefined,
        fontWeight: 600,
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      Use
    </div>
  );
}
const lineClamps = (lineHeight: number, lines: number) =>
  ({
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lines,
    overflow: "hidden",
    lineHeight: `${lineHeight}px`,
  } as CSSProperties);
