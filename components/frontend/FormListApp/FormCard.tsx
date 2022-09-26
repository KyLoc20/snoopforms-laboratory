import { useState, CSSProperties, PropsWithChildren, MouseEventHandler } from "react";
import { TerminalIcon as CodeIcon, ViewGridAddIcon as NoCodeIcon, DotsHorizontalIcon as MoreIcon, TrashIcon } from "@heroicons/react/outline";
import Link from "next/link";
type AvailableFormType = "nocode" | "code";
interface FormCardProps {
  id: string;
  name: string;
  type: AvailableFormType;
  // responses: number;
  questions: number;
  onDelete: (formId: string) => void;
}
export default function FormCard({ id, name, type, questions, onDelete }: FormCardProps) {
  return (
    <Link href={`/forms/${id}`}>
      <a>
        <CardWrapper>
          <div style={{ padding: "24px" }}>
            <FormName name={name}></FormName>
          </div>
          <div>
            <div style={{ display: "flex", padding: "0 16px", marginBottom: "8px" }}>
              <FormType type={type}></FormType>
            </div>
            <ControlPanel>
              {questions} {questions > 1 ? "questions" : "question"}
              <DeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onDelete(id);
                }}
              ></DeleteButton>
            </ControlPanel>
          </div>
        </CardWrapper>
      </a>
    </Link>
  );
}

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
function DeleteButton({ onClick }: { onClick: MouseEventHandler }) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div
      onClick={onClick}
      style={{ padding: "8px", margin: "-8px", transition: "all .2s cubic-bezier(.4,.2,0,1)", color: isHovering ? "#f53b57" : "" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <TrashIcon style={{ width: "20px", height: "20px" }}></TrashIcon>
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
