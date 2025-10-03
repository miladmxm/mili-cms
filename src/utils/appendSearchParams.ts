export const appendSearchParams = (
  url: URL,
  params: Record<string, string | undefined>,
) => {
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value);
    }
  });
  return url;
};
export const appendSearchParamsToString = (
  url: string,
  params: Record<string, string>,
) => {
  const urlObj = new URL(url);
  return appendSearchParams(urlObj, params).toString();
};
