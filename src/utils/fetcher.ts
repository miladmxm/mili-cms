type JsonValue = boolean | number | string | JsonArray | JsonObject | null;

interface JsonObject {
  [key: string]: JsonValue;
}

interface JsonArray extends Array<JsonValue> {}

export const fetcher = async (
  url: RequestInfo | URL,
  options?: RequestInit,
) => {
  const res = await fetch(url, options);
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
