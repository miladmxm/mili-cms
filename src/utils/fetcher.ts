import type { JsonArray, JsonObject } from "@/types/type";

import { ThrowableDalError } from "@/dal/types";

const isSuccessStatus = (status: number) => {
  return status >= 200 && status < 300;
};
export const fetcher = async (
  url: RequestInfo | URL,
  options?: RequestInit,
) => {
  const res = await fetch(url, options);

  if (!isSuccessStatus(res.status)) {
    throw new ThrowableDalError({
      type: "fetch-error",
      status: res.status,
    });
  }

  const jsonRes = await res.json();
  return jsonRes;
};
export const GET = (url: RequestInfo | URL, options?: RequestInit) =>
  fetcher(url, { ...options, method: "GET" });

export const POST = <T extends JsonArray | JsonObject>(
  url: RequestInfo | URL,
  data: T,
  options?: RequestInit,
) => fetcher(url, { ...options, method: "POST", body: JSON.stringify(data) });

export const DELETE = (url: RequestInfo | URL, options?: RequestInit) =>
  fetcher(url, { ...options, method: "DELETE" });
export const PUT = (url: RequestInfo | URL, options?: RequestInit) =>
  fetcher(url, { ...options, method: "PUT" });
