import { PropsWithChildren } from "react";
import { CheckIcon, MinusIcon } from "@heroicons/react/solid";
import { SubmissionSessionData } from "@/lib/types";
import { convertDateTimeString, convertTimeString } from "@/lib/utils";
import { TrashIcon } from "@heroicons/react/outline";
import { hasAnswer } from "@/lib/snoopforms/react/questions";
import clsx from "clsx";
import styles from "./SessionCard.module.css";
export default function SessionCardWithTimeline({
  session,
  onDelete,
  children,
}: PropsWithChildren<{ session: SubmissionSessionData; onDelete: (id: string) => void }>) {
  //min-width = 120px(List) + 65px(divider) + 252px(Timeline) + 32px(padding) = 469px
  return (
    <div className="flex flex-col w-full mb-4">
      <div className={clsx(styles.wrapper, "flex flex-1 mx-4 px-4 pt-5 bg-white rounded-md shadow relative")}>
        <div className={clsx("session-list", "min-w-[120px] w-full")}>
          <h1 className={clsx(styles.header, "mb-8 text-gray-700")}>{convertDateTimeString(session.createdAt)}</h1>
          {children}
        </div>
        <Divider></Divider>
        <Timeline session={session} />
        <Control onDelete={() => onDelete(session.id)} />
      </div>
      <DeleteButton OnClick={() => onDelete(session.id)} />
    </div>
  );
}
function Timeline({ session }: { session: SubmissionSessionData }) {
  //min-width = 8px(paddingLeft) + 244px(content) = 252px
  return (
    <div className={clsx(styles.timeline, "pl-2 min-w-[252px]")}>
      <h1 className={clsx(styles.header, "mb-8 text-gray-700")}>Session Activity</h1>
      <ul role="list">
        {session.submissions.reverse().map((submission, submissionIdx) => (
          <li key={submission.id} className={clsx("activity", "relative pb-8")}>
            {submissionIdx !== session.submissions.length - 1 && <ActivityLine />}
            <div className={"min-w-[244px] relative flex space-x-3"}>
              <ActivityIvon hasAnswer={hasAnswer(submission.questionType, submission.details)} />
              <div className="min-w-0 flex-1 pt-1.5 flex justify-between flex-wrap gap-4">
                <p className="w-[200px] truncate text-sm text-gray-500">{submission.questionType}</p>
                <p className="text-sm text-right text-gray-500 whitespace-nowrap">
                  <time dateTime={session.createdAt}>{convertTimeString(session.createdAt)}</time>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
function ActivityLine({}) {
  return <span className={clsx("activity-line", "absolute top-4 left-4 -ml-px h-full w-0.5 bg-ui-gray-light")} aria-hidden="true" />;
}
function ActivityIvon({ hasAnswer }: { hasAnswer: boolean }) {
  if (hasAnswer)
    return (
      <div className={clsx("activity-icon", "answered", "bg-red-200 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white")}>
        <CheckIcon className="w-5 h-5 text-white" aria-hidden="true" />
      </div>
    );
  else
    return (
      <div className={clsx("activity-icon", "unanswered", "bg-gray-200 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white")}>
        <MinusIcon className="w-5 h-5 text-white" aria-hidden="true" />
      </div>
    );
}
function Divider({}) {
  return <div className={clsx(styles.divider, "bg-gray min-w-[1px] mx-8")}></div>;
}
function Control({ onDelete }: { onDelete: () => void }) {
  return (
    <div className={clsx(styles.control, "flex items-end h-[54px] w-full absolute left-0 bottom-[16px]")}>
      <DeleteButton OnClick={onDelete} />
    </div>
  );
}

function DeleteButton({ OnClick }: { OnClick: () => void }) {
  return (
    <button
      className={clsx(
        styles.delete,
        "items-center justify-center gap-2 mx-4 mt-4 h-[38px] min-w-[244px] transition-all rounded-sm px-4 py-2 text-sm font-medium text-white bg-gray-300 border border-transparent shadow-sm hover:bg-red-500 focus:outline-none"
      )}
      onClick={OnClick}
    >
      <TrashIcon className="w-4 h-4" />
      Delete Submission
    </button>
  );
}
