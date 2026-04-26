export const getItemsDirtyData = <
  TData extends Record<string, unknown>,
  TDirtyItems extends Record<string, unknown>,
>(
  data: TData,
  dirtyItems: TDirtyItems,
): Partial<TData> => {
  const dirtyItemsEntries = Object.entries(dirtyItems);

  return dirtyItemsEntries.reduce((dirtyData, [name, value]) => {
    if (typeof value !== "object") {
      return { ...dirtyData, [name]: data[name] };
    }
    if (!data[name]) return dirtyData;
    return {
      ...dirtyData,
      [name]: getItemsDirtyData(
        data[name] as TData,
        dirtyItems[name] as TDirtyItems,
      ),
    };
  }, {});
};
