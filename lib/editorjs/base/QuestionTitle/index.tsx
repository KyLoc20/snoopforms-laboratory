import { PropsWithChildren } from "react";

export default function QuestionTitle({ children }: PropsWithChildren<{}>) {
  return (
    <div className="question-title" style={{ color: "rgba(56, 70, 84, 1)", height: "28px", display: "flex", alignItems: "center" }}>
      <div style={{ width: "100%", lineHeight: "24px", fontSize: "16px", fontWeight: 700 }}>{children}</div>
    </div>
  );
}
