import { PropsWithChildren } from "react";
import Mark from "../Mark";
import QuestionTitle from "../QuestionTitle";

export default function QuestionContainer({ children, title, isRequired }: PropsWithChildren<{ title: string; isRequired: boolean }>) {
  return (
    <div className="question-container" style={{ paddingBottom: "20px", position: "relative" }}>
      <div style={{ position: "relative" }}>
        <QuestionTitle title={title} />
        <Mark active={isRequired}></Mark>
      </div>
      {children}
    </div>
  );
}
