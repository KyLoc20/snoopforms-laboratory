import useSWR from "swr";
import { fetcher } from "./utils";
import { SubmissionSessionData, SubmissionData } from "./types";
type SubmissionSessionsResult = { formId: string; sessions: SubmissionSessionData[] };
export const useSubmissionSessions = (formId: string) => {
  const { data, error, mutate } = useSWR(() => `/api/forms/${formId}/submissionSessions`, fetcher);
  //should use a default Data typed SubmissionSessionData[]?
  const submissionSessions = (data ? data : []) as SubmissionSessionData[];
  console.log("useSubmissionSessions", submissionSessions);
  return {
    submissionSessions,
    isLoadingSubmissionSessions: !error && !data,
    isErrorSubmissionSessions: error,
    mutateSubmissionSessions: mutate,
  };
};
export const persistOneSubmissionSession = (formId: string, payload: SubmissionSessionData) => {
  return fetch(`/api/forms/${formId}/submissionSessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};
