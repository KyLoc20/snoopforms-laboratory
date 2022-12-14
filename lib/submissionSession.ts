import { useSWRSafely } from "./utils";
import { SubmissionSessionData } from "./types";
const EMPTY_SUBMISSIONSESSIONS: SubmissionSessionData[] = [];
export const useSubmissionSessions = (formId?: string) => {
  const { data, hasData, hasError, isLoading, error, mutate } = useSWRSafely(`/api/forms/${formId}/submissionSessions`);
  // if formId === undefined, submissionSessions -> EMPTY_SUBMISSIONSESSIONS
  const submissionSessions = formId === undefined ? EMPTY_SUBMISSIONSESSIONS : data ? (data as SubmissionSessionData[]) : EMPTY_SUBMISSIONSESSIONS;
  return {
    submissionSessions,
    hasData,
    hasError,
    isLoading,
    error,
    mutate,
  };
};
export const persistOneSubmissionSession = (formId: string, payload: SubmissionSessionData) => {
  return fetch(`/api/forms/${formId}/submissionSessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};
