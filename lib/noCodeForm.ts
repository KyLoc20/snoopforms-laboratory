import useSWR from "swr";
import { fetcher } from "./utils";
import { NoCodeFormData } from "./types";
export const useNoCodeForm = (formId: string) => {
  const { data, error, mutate } = useSWR(`/api/forms/${formId}/nocodeform`, fetcher);
  const noCodeForm = (data ? (data as NoCodeFormData) : {}) as NoCodeFormData;
  return {
    noCodeForm,
    isLoadingNoCodeForm: !error && !data,
    isErrorNoCodeForm: error,
    mutateNoCodeForm: mutate,
  };
};
export const persistNoCodeForm = async (noCodeForm: NoCodeFormData) => {
  try {
    return await fetch(`/api/forms/${noCodeForm.formId}/nocodeform`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noCodeForm),
    });
  } catch (error) {
    console.error(error);
  }
};
