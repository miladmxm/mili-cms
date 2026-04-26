export const renameObjectItemInArray = <
  T extends Record<string, unknown>,
  FK extends keyof T,
  TK extends string,
>(
  arr: T[],
  fromKey: FK,
  toKey: TK,
) => {
  return arr.map(
    (item) =>
      Object.keys(item).reduce((prev, current) => {
        if (current === fromKey) return { ...prev, [toKey]: item[current] };
        return { ...prev, [current]: item[current] };
      }, {}) as Omit<T, FK> & Record<TK, T[FK]>,
  );
};
