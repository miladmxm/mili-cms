export const filterArrayByObjectKeyValue = <T>(
  array: T[],
  key: keyof T,
  value: unknown,
): T[] => {
  return array.filter((item) => item[key] !== value);
};
