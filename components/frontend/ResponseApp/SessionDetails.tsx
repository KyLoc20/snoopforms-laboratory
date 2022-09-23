import clsx from "clsx";
import { SubmissionSessionData, SubmissionData } from "@/lib/types";
import { createResponseDisplay } from "@/lib/snoopforms/react/questions";
import { useNoCodeForm } from "@/lib/noCodeForm";
import Chip from "@/lib/ui/Chip";
import { shortcut } from "@/lib/snoopforms/react/questions";
import { useMemo } from "react";
import { getFormPagination, getSubmissionPagination, getQuestionTitleMap, TitleMap } from "./helpers";

export default function SessionDetails({ formId, submissionSession }: { formId: string; submissionSession: SubmissionSessionData }) {
  //make sure the corresponding Form to be existed
  const { noCodeForm } = useNoCodeForm(formId);
  //pagination
  const pages = useMemo(() => {
    const formPagination = getFormPagination(noCodeForm.blocks);
    const pages = getSubmissionPagination(submissionSession.submissions, formPagination);
    return pages;
  }, [submissionSession, noCodeForm]);
  //id title mapping
  const id2Title = getQuestionTitleMap(noCodeForm.blocks);
  return (
    <ul role="list" className={clsx("submission-list", "divide-y divide-ui-gray-light")}>
      {pages.map((submissionsInOnePage, i) => (
        <SubmissionPage submissions={submissionsInOnePage} key={i} titleMap={id2Title} />
      ))}
    </ul>
  );
}
export function SubmissionPage({ submissions, titleMap }: { submissions: SubmissionData[]; titleMap: TitleMap }) {
  return (
    <div style={{ marginBottom: "16px", padding: "8px", border: "dashed 2px rgb(210, 218, 226)", borderRadius: "6px" }}>
      {submissions.map((submission, i) => (
        <SubmissionDisplay
          key={submission.id}
          submission={submission}
          questionTitle={titleMap[submission.questionId] ?? submission.questionId}
        ></SubmissionDisplay>
      ))}
    </div>
  );
}
function SubmissionDisplay({ submission, questionTitle }: { submission: SubmissionData; questionTitle: string }) {
  const RenderDisplay = createResponseDisplay(submission.questionType, submission.details);
  //TODO no answer
  return (
    <li className="py-5" style={{ borderBottom: "1px solid #d2dae2" }}>
      <p className="text-sm font-semibold text-gray-800">
        {questionTitle || "Your Question"}
        <span className="ml-2">
          <Chip label={shortcut(submission.questionType)} hegiht={20} padding="0 6px" fontSize="12px" />
        </span>
      </p>
      <p className={clsx(submission.details ? "text-gray-600" : "text-gray-400", "mt-2 text-sm text-gray-600 line-clamp-2")}>
        <RenderDisplay></RenderDisplay>
      </p>
    </li>
  );
}
