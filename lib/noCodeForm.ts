import { useSWRSafely } from "./utils";
import { NoCodeFormData } from "./types";
const EMPTY_NOCODEFORM: NoCodeFormData = {
  formId: "_empty_nocode_form",
  name: "_empty_nocode_form",
  blocks: [],
  blocksDraft: [],
};
export const useNoCodeForm = (formId?: string) => {
  const { data, hasData, hasError, isLoading, error, mutate } = useSWRSafely(`/api/forms/${formId}/nocodeform`);
  // console.log(`---> Form of ${formId} useNoCodeForm hasData ${hasData} hasError ${hasError} error ${error}`);
  if (!formId) {
    //always unavailable
    return {
      noCodeForm: EMPTY_NOCODEFORM,
      hasData: false,
      hasError: false,
      isLoading: true,
      error,
      mutateNoCodeForm: mutate,
    };
  } else {
    const noCodeForm = data ? (data as NoCodeFormData) : EMPTY_NOCODEFORM;
    return {
      noCodeForm,
      hasData,
      hasError,
      isLoading,
      error,
      mutateNoCodeForm: mutate,
    };
  }
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
