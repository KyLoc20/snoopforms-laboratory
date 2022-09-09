import { PropsWithChildren } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import { SubmissionSessionData } from "@/lib/types";
import { convertDateTimeString, convertTimeString } from "@/lib/utils";
import DeleteButton from "./DeleteButton";
import clsx from "clsx";
import styles from "./ActiveSessionCard.module.css";
export default function ActiveSessionCard({
  session,
  onDelete,
  children,
}: PropsWithChildren<{ session: SubmissionSessionData; onDelete: (id: string) => void }>) {
  //min-width = 120px(List) + 65px(divider) + 252px(Timeline) + 32px(padding) = 469px
  return (
    <div className="flex flex-col w-full">
      <div className={clsx("wrapper", "flex flex-1 mx-4 px-4 py-5 bg-white rounded-md shadow")}>
        <div className={clsx("session-list", "min-w-[120px] w-full")}>
          <h1 className="mb-8 text-gray-700">{convertDateTimeString(session.createdAt)}</h1>
          {children}
        </div>
        <Divider></Divider>
        <Timeline session={session} />
      </div>
      <DeleteButton OnClick={() => onDelete(session.id)} />
    </div>
  );
}
function Timeline({ session }: { session: SubmissionSessionData }) {
  //min-width = 8px(paddingLeft) + 244px(content) = 252px
  return (
    <div className={clsx(styles.timeline, "pl-2 min-w-[252px]")}>
      <h1 className="mb-8 text-gray-700">Session Activity</h1>
      <ul role="list" className="-mb-8">
        {session.submissions.map((submission, submissionIdx) => (
          <li key={submission.id}>
            <div className={clsx("activity", "relative pb-8")}>
              {submissionIdx !== session.submissions.length - 1 ? (
                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-ui-gray-light" aria-hidden="true" />
              ) : null}
              <div className={"min-w-[244px] relative flex space-x-3"}>
                <div>
                  <span className={clsx("activity-icon", "bg-red-200 h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white")}>
                    <CheckIcon className="w-5 h-5 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between flex-wrap gap-4">
                  <p className="w-[200px] truncate text-sm text-gray-500">{submission.questionType}</p>
                  <div className="text-sm text-right text-gray-500 whitespace-nowrap">
                    <time dateTime={session.createdAt}>{convertTimeString(session.createdAt)}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
function Divider({}) {
  return <div className={clsx(styles.divider, "bg-gray min-w-[1px] mx-8")}></div>;
}
