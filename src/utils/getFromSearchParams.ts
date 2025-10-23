type SearchParams = Record<string, string | string[] | undefined>;

const getItemFromSearchParam = ({
  selectorKey,
  defaultValue,
  searchParams,
}: {
  selectorKey: string;
  defaultValue: string;
  searchParams?: SearchParams;
}): string => {
  if (!searchParams) return defaultValue;
  const value = searchParams[selectorKey];
  if (value && Object.hasOwn(searchParams, selectorKey)) {
    if (typeof value === "string") return value;
    else return value.join("");
  }
  return defaultValue;
};

export const getPageRenderItemCounterByOffsetInSearchParams = async (
  searchParams?: Promise<SearchParams>,
  offset: number = 10,
): Promise<number> => {
  const search = await searchParams;
  const page = getItemFromSearchParam({
    searchParams: search,
    selectorKey: "page",
    defaultValue: "1",
  });
  const pageNumbaer = parseInt(page, 10);
  const counter = offset * pageNumbaer;
  return counter;
};
