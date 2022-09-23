import { PropsWithChildren } from "react";
import { FORM_GRAY_LIGHT } from "../../base/design";

export default function QuestionTitle({ children, title }: PropsWithChildren<{ title: string }>) {
  const isTitleMissing = !title;

  if (isTitleMissing) {
    return (
      <p
        className="question-title missing"
        style={{
          width: "100%",
          lineHeight: "24px",
          fontSize: "16px",
          fontWeight: 700,
          color: FORM_GRAY_LIGHT,
          margin: "4px 0",
        }}
      >
        A Question description is missing here
      </p>
    );
  } else
    return (
      <p
        className="question-title"
        style={{
          width: "100%",
          lineHeight: "24px",
          fontSize: "16px",
          fontWeight: 700,
          color: "rgba(56, 70, 84, 1)",
          margin: "4px 0",
        }}
      >
        {title}
      </p>
    );
}
