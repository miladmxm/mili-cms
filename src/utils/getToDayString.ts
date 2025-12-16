export const getToDayString = (): string => {
  return new Date().toLocaleDateString("en").replaceAll("/", "-");
};
