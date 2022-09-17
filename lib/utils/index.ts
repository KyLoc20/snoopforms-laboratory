import intlFormat from "date-fns/intlFormat";
import useSWR from "swr";
import { formatDistance } from "date-fns";
export type RequestError = {
  errCode: number;
  errMessage: string;
};
export const useSWRSafely = (key: string) => {
  const {
    data,
    error: _err,
    mutate,
  } = useSWR(key, fetcher, {
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
  return { data, hasData, hasError, isLoading, error, mutate };
};
export const fetcher = async (url: string) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error: any = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    const _info = await res.json();
    error.message = _info?.message;
    error.status = res.status;
    throw error;
  }

  return res.json();
};
export const generateId = (length: number) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
export const convertDateTimeString = (dateString: string) => {
  const date = new Date(dateString);
  return intlFormat(
    date,
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    },
    {
      locale: "en",
    }
  );
};

export const convertTimeString = (dateString: string) => {
  const date = new Date(dateString);
  return intlFormat(
    date,
    {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    },
    {
      locale: "en",
    }
  );
};
export const timeSince = (dateString?: string) => {
  if (!dateString) return "--";
  else {
    const date = new Date(dateString);
    return formatDistance(date, new Date(), {
      addSuffix: true,
    });
  }
};
