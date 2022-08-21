import useSWR from "swr";
import { fetcher } from "./utils";
import { SubmissionData } from "./types";
export const useSubmissions = (formId: string) => {
  const { data, error, mutate } = useSWR(`/api/forms/${formId}/submissions`, fetcher);
  return {
    result: data as {
      formId: string;
      list: SubmissionData[];
    },
    isLoadingSubmissions: !error && !data,
    isErrorSubmissions: error,
    mutateSubmissions: mutate,
  };
};
export const persistOneSubmission = async (formId: string, payload: SubmissionData) => {
  try {
    await fetch(`/api/forms/${formId}/submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error(error);
  }
};
