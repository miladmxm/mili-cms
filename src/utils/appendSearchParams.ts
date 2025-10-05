type Parmams = Record<string, boolean | number | string | undefined>;

export const appendSearchParams = (url: URL, params: Parmams) => {
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value.toString());
    }
  });
  return url;
};
export const appendSearchParamsToString = (url: string, params: Parmams) => {
  const urlObj = new URL(url);
  return appendSearchParams(urlObj, params).toString();
};

export function toWooQueryParams(url: URL, query: Record<string, any>): URL {
  const params = url.searchParams;

  const appendParam = (key: string, value: any) => {
    if (value === undefined || value === null || value === "") return;
    if (Array.isArray(value)) {
      params.append(key, value.join(","));
    } else if (typeof value === "object") {
      Object.entries(value).forEach(([subKey, subValue]) => {
        if (Array.isArray(subValue)) {
          subValue.forEach((v, i) => params.append(`${key}[${i}]`, v));
        } else {
          params.append(`${key}[${subKey}]`, String(subValue));
        }
      });
    } else {
      params.append(key, String(value));
    }
  };

  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      appendParam(key, value);
    } else if (
      typeof value === "object" &&
      value !== null &&
      key === "attributes"
    ) {
      value.forEach((attr: any, index: number) => {
        Object.entries(attr).forEach(([subKey, subValue]) => {
          params.append(`attributes[${index}][${subKey}]`, String(subValue));
        });
      });
    } else {
      appendParam(key, value);
    }
  });

  // const queryString = params.toString();
  return url;
}
