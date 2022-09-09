import { PropsWithChildren } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import { SubmissionSessionData } from "@/lib/types";
import { convertDateTimeString, convertTimeString } from "@/lib/utils";
import DeleteButton from "./DeleteButton";
import clsx from "clsx";
export default function ActiveSessionCard({
  session,
  onDelete,
  children,
}: PropsWithChildren<{ session: SubmissionSessionData; onDelete: (id: string) => void }>) {
  return (
    <div className="overflow-visible sm:rounded-lg">
      <div className="px-4 py-5 bg-white shadow sm:px-12 sm:pb-4 sm:pt-12">
        <div className="grid grid-cols-2 gap-8 divide-x">
          <div className="flow-root">
            <h1 className="mb-8 text-gray-700">{convertDateTimeString(session.createdAt)}</h1>
            {children}
          </div>
          <div className="hidden pl-10 md:flow-root">
            <h1 className="mb-8 text-gray-700">Session Activity</h1>
            <ul role="list" className="-mb-8">
              {session.submissions.map((submission, submissionIdx) => (
                <li key={submission.id}>
                  <div className="relative pb-8">
                    {submissionIdx !== session.submissions.length - 1 ? (
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-ui-gray-light" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className={clsx("bg-red-200", "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white")}>
                          <CheckIcon className="w-5 h-5 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between flex-wrap gap-4">
                        <div>
                          <p className="text-sm text-gray-500">{submission.questionType}</p>
                        </div>
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
        </div>
      </div>
      <div className="w-full">
        <DeleteButton OnClick={() => onDelete(session.id)} />
      </div>
    </div>
  );
}
