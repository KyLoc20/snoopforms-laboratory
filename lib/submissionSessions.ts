import useSWR from "swr";
import { fetcher } from "./utils";
import { SubmissionSessionData } from "./types";
type SubmissionSessionsResult = { formId: string; sessions: SubmissionSessionData[] };
export const useSubmissionSessions = (formId: string) => {
  const { data, error, mutate } = useSWR(() => `/api/forms/${formId}/submissionSessions`, fetcher);
  const submissionSessions = data ? (data as SubmissionSessionsResult).sessions : {};
  return {
    submissionSessions,
    isLoadingSubmissionSessions: !error && !data,
    isErrorSubmissionSessions: error,
    mutateSubmissionSessions: mutate,
  };
};
export const persistOneSubmissionSession = async (formId: string, payload: SubmissionSessionData) => {
  try {
    await fetch(`/api/forms/${formId}/submissionSessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error(error);
  }
};
