import useSWR from "swr";
import { fetcher, RequestError } from "./utils";
import { NoCodeFormData } from "./types";
export const useNoCodeForm = (formId?: string) => {
  const {
    data,
    error: _err,
    mutate,
  } = useSWR(`/api/forms/${formId}/nocodeform`, fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Never retry on 404.
      if (error.status === 404) return;
      // Retry after 5 seconds.
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });
  const hasData = data !== undefined;
  const hasError = _err !== undefined;
  //That either of them equals true means the request has finished
  const isLoading = !hasData && !hasError;
  const error = hasError ? ({ errCode: _err?.status ?? 400, errMessage: _err?.message ?? "Something Wrong Happened" } as RequestError) : undefined;

  // console.log(`---> Form of ${formId} useNoCodeForm hasData ${hasData} hasError ${hasError} error ${error}`);
  if (!formId) {
    //always unavailable
    return {
      noCodeForm: {} as NoCodeFormData,
      hasData: false,
      hasError: false,
      isLoading: true,
      error,
      mutateNoCodeForm: mutate,
    };
  } else {
    const noCodeForm = (data ? (data as NoCodeFormData) : {}) as NoCodeFormData;
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
