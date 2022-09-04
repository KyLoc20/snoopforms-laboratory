import useSWR from "swr";
import { fetcher } from "./utils";
import { NoCodeFormData } from "./types";
export const useFormList = () => {
  const { data, error, mutate } = useSWR(`/api/forms`, fetcher);
  const formList = data ? (data as NoCodeFormData[]) : [];
  return {
    formList,
    isLoadingFormList: !error && !data,
    isErrorFormList: error,
    mutateFormList: mutate,
  };
};
