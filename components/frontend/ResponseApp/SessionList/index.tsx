import { useEffect, useState, PropsWithChildren } from "react";
import { SubmissionSessionData } from "@/lib/types";
import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
// import { getEventName } from "@/lib/events";
import { convertDateTimeString } from "@/lib/utils";
// import DownloadResponses from "./DownloadResponses";
export default function SessionList({
  sessions,
  activeSession,
  setActiveSubmissionSession,
}: PropsWithChildren<{ sessions: SubmissionSessionData[]; activeSession: SubmissionSessionData | null; setActiveSubmissionSession: any }>) {
  return (
    <>
      {/* <DownloadResponses formId={formId} /> */}
      <div className="pt-4 pb-2">
        <h2 className="px-5 text-lg font-medium text-gray-900">Responses</h2>
      </div>
      {sessions.length === 0 ? (
        <p className="px-5 mt-3 text-sm text-gray-500">No responses yet</p>
      ) : (
        <RadioGroup value={activeSession} onChange={setActiveSubmissionSession} className="flex-1 min-h-0 mb-32 overflow-y-auto shadow-inner" as="div">
          <div className="relative">
            <ul className="relative z-0 divide-y divide-ui-gray-light">
              {sessions.map((submissionSession) => (
                <RadioGroup.Option
                  key={submissionSession.id}
                  value={submissionSession}
                  className={({ checked }) => clsx(checked ? "bg-gray-100" : "", "relative flex items-center px-6 py-5 space-x-3 ")}
                >
                  <div className="flex-1 min-w-0">
                    <button onClick={() => setActiveSubmissionSession(submissionSession)} className="w-full text-left focus:outline-none">
                      {/* Extend touch target to entire panel */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900">{convertDateTimeString(submissionSession.createdAt)}</p>
                      <p className="text-sm text-gray-500 truncate">{submissionSession.submissions.length} events</p>
                    </button>
                  </div>
                </RadioGroup.Option>
              ))}
            </ul>
          </div>
        </RadioGroup>
      )}
    </>
  );
}
