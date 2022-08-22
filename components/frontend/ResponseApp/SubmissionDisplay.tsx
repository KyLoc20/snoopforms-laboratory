import { useMemo } from "react";
import { classNames } from "@/lib/utils";
import { SubmissionSessionData, SubmissionData } from "@/lib/types";
import { createResponseDisplay } from "@/lib/snoopforms/react/questions";
type List<T> = T[];
type SubmissionPage = List<SubmissionData>;
const paginateSession = (session: SubmissionSessionData): List<SubmissionPage> => {
  return [session.submissions];
};
export default function SubmissionSessionDisplay({ formId, submissionSession }: { formId: string; submissionSession: SubmissionSessionData }) {
  //make sure the corresponding Form to be existed
  // const { form, isLoadingForm } = useForm(formId);

  //pagination
  const pages = paginateSession(submissionSession);
  return (
    <div className="flow-root">
      <ul role="list" className="divide-y divide-ui-gray-light">
        {pages.map((submissionsInOnePage, i) => (
          <SubmissionPage submissions={submissionsInOnePage} key={i}></SubmissionPage>
        ))}
      </ul>
    </div>
  );
}
function SubmissionPage({ submissions }: { submissions: SubmissionPage }) {
  return (
    <div style={{ marginBottom: "8px", padding: "8px", border: "dashed 2px rgb(210, 218, 226)", borderRadius: "6px" }}>
      {submissions.map((submission, i) => (
        <SubmissionDisplay key={submission.id} submission={submission}></SubmissionDisplay>
      ))}
    </div>
  );
}
function SubmissionDisplay({ submission }: { submission: SubmissionData }) {
  const RenderDisplay = createResponseDisplay(submission.questionType, submission.details);
  return (
    <li className="py-5" style={{ borderBottom: "1px solid #d2dae2" }}>
      <p className="text-sm font-semibold text-gray-800">{submission.questionType}</p>
      <p className={classNames(submission.details ? "text-gray-600" : "text-gray-400", "pt-1 text-sm text-gray-600 line-clamp-2")}>
        <RenderDisplay></RenderDisplay>
      </p>
    </li>
  );
}
