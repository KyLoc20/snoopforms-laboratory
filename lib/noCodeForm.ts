import { useSWRSafely } from "./utils";
import { BlockData, NoCodeFormData, FormInformationData } from "./types";
const EMPTY_NOCODEFORM: NoCodeFormData = {
  formId: "_empty_nocode_form",
  name: "_empty_nocode_form",
  blocks: [],
  blocksDraft: [],
};
export const useNoCodeForm = (formId?: string) => {
  const { data, hasData, hasError, isLoading, error, mutate } = useSWRSafely(`/api/forms/${formId}/nocodeform`);
  // console.log(`---> Form of ${formId} useNoCodeForm hasData ${hasData} hasError ${hasError} error ${error}`);
  // if formId === undefined, noCodeForm -> EMPTY_NOCODEFORM
  const noCodeForm = formId === undefined ? EMPTY_NOCODEFORM : data ? (data as NoCodeFormData) : EMPTY_NOCODEFORM;
  return {
    noCodeForm,
    hasData,
    hasError,
    isLoading,
    error,
    mutateNoCodeForm: mutate,
  };
};
export const queryNoCodeFormInformation = (formId: string): Promise<FormInformationData> => {
  return fetch(`/api/forms/${formId}/information`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};
export const persistNoCodeForm = (noCodeForm: NoCodeFormData) => {
  return fetch(`/api/forms/${noCodeForm.formId}/nocodeform`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noCodeForm),
  });
};
export const deleteNoCodeForm = (formId: string) => {
  return fetch(`/api/forms/${formId}/nocodeform`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: undefined,
  });
};
export const generateForm = (formId: string, name: string, blocks: BlockData[]): NoCodeFormData => ({
  formId,
  name,
  blocks: [],
  blocksDraft: blocks,
});
