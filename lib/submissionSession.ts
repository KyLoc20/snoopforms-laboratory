import useSWR from "swr";
import { fetcher } from "./utils";
import { SubmissionSessionData } from "./types";
type SubmissionSessionsResult = { formId: string; sessions: SubmissionSessionData[] };
export const useSubmissionSessions = (formId: string) => {
  const { data, error, mutate } = useSWR(() => `/api/forms/${formId}/submissionSessions`, fetcher);
  //should use a default Data typed SubmissionSessionData[]?
  const submissionSessions = (data ? (data as SubmissionSessionsResult).sessions : {}) as SubmissionSessionData[];
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
