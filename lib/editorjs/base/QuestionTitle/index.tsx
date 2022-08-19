import { PropsWithChildren } from "react";
import { FORM_GRAY_LIGHT } from "../design";

export default function QuestionTitle({ children, title }: PropsWithChildren<{ title: string }>) {
  const isTitleMissing = !title;

  if (isTitleMissing) {
    return (
      <div className="question-title missing" style={{ color: FORM_GRAY_LIGHT, height: "28px", display: "flex", alignItems: "center" }}>
        <div style={{ width: "100%", lineHeight: "24px", fontSize: "16px", fontWeight: 700 }}>A Question description is missing here</div>
      </div>
    );
  } else
    return (
      <div className="question-title" style={{ color: "rgba(56, 70, 84, 1)", height: "28px", display: "flex", alignItems: "center" }}>
        <div style={{ width: "100%", lineHeight: "24px", fontSize: "16px", fontWeight: 700 }}>{title}</div>
      </div>
    );
}
