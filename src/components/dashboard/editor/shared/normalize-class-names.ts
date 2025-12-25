export default function normalizeClassNames(
  ...classNames: (boolean | string | typeof undefined | null)[]
): string[] {
  const rval = [];
  for (const className of classNames) {
    if (className && typeof className === "string") {
      for (const [s] of Array.from(className.matchAll(/\S+/g))) {
        rval.push(s);
      }
    }
  }
  return rval;
}
