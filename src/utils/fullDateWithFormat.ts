export const fullDateWithFormat = (d: Date, lang?: string): string => {
  return new Intl.DateTimeFormat(lang, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
};
