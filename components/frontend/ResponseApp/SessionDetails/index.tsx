import clsx from "clsx";
import { SubmissionSessionData, SubmissionData, NoCodeFormData, BlockData } from "@/lib/types";
import { createResponseDisplay, isQuestionType } from "@/lib/snoopforms/react/questions";
import { useNoCodeForm } from "@/lib/noCodeForm";
import Chip from "@/lib/ui/Chip";
import { shortcut } from "@/lib/snoopforms/react/questions";
import { useMemo } from "react";
import { generateId } from "@/lib/utils";

export default function SessionDetails({ formId, submissionSession }: { formId: string; submissionSession: SubmissionSessionData }) {
  //make sure the corresponding Form to be existed
  const { noCodeForm } = useNoCodeForm(formId);
  //pagination
  const pages = useMemo(() => {
    const formPagination = getFormPagination(noCodeForm.blocks);
    const pages = paginateSession(submissionSession, formPagination);
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
export function SubmissionPage({ submissions, titleMap }: { submissions: SubmissionPage; titleMap: TitleMap }) {
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

type QuestionId = string;
export const getFormPagination = (blocks: BlockData[]) => {
  const pages: List<QuestionId[]> = [];
  let cPage: QuestionId[] = [];
  blocks.forEach((block) => {
    const { id, type } = block;
    if (isQuestionType(type)) {
      cPage.push(id);
    }
    if (type === "pageTransition") {
      pages.push(cPage);
      cPage = [];
    }
  });
  if (cPage.length > 0) {
    pages.push(cPage);
  }
  return pages;
};
type List<T> = T[];
type SubmissionPage = List<SubmissionData>;
const paginateSession = (session: SubmissionSessionData, formPages: List<QuestionId[]>): List<SubmissionPage> => {
  const submissions = session.submissions;
  const pages: List<SubmissionPage> = formPages.map((questions) => {
    const submissionPage = questions.map((questionId) => {
      const possibleAnswer = submissions.find((answer) => answer.questionId === questionId);
      if (possibleAnswer !== undefined) {
        return possibleAnswer;
      } else {
        //basically this won't happen cuz all submissions are here
        return {
          id: generateId(10),
          questionId: questionId,
          questionType: "unknown",
          details: {},
        } as SubmissionData;
      }
    });
    return submissionPage;
  });
  return pages;
};

type TitleMap = { [questionId: string]: string };
export const getQuestionTitleMap = (blocks: BlockData[]) => {
  //init a Map: questionId -> questionTitle
  const questionTitleMap: TitleMap = {};
  blocks.forEach((block) => {
    const { id, type, data } = block;
    if (isQuestionType(type)) {
      //todo questionConfig: data._component dangerous
      questionTitleMap[id] = (data?._component?.title as string) ?? id;
    }
  });
  return questionTitleMap;
};
