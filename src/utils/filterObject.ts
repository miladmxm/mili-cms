export const filterObjectByKeys = <T extends object, K extends (keyof T)[]>(
  obj: T,
  keys: K,
): Pick<T, K[number]> => {
  const newObject = Object.fromEntries(
    Object.entries(obj).filter(([key]) => keys.includes(key as keyof T)),
  ) as Pick<T, K[number]>;

  return newObject;
};
