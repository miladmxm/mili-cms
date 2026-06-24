export const fullDateWithFormat = (d: Date, lang?: string): string => {
  return new Intl.DateTimeFormat(lang, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
};

export const fullDateNumberFormat = (
  d: Date,
  lang: string = "fa-ir",
): string => {
  return Intl.DateTimeFormat(lang).format(d);
};
