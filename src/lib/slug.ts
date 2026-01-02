import transliterate from "@sindresorhus/transliterate";

export const slugRegex = /^[-0-9a-z]+$/g;

export const convertToSlug = (text: string): string => {
  return transliterate(text.toLowerCase().trim()).replace(/[^-0-9a-z]/g, "-");
};
export const generateUniqueSlug = (
  baseSlug: string,
  existing: string[],
): string => {
  if (existing.length === 0) {
    return baseSlug;
  }
  let max = 0;

  for (const slug of existing) {
    const match = slug.match(new RegExp(`^${baseSlug}-(\\d+)$`));
    if (match) {
      max = Math.max(max, Number(match[1]));
    }
  }

  return `${baseSlug}-${max + 1}`;
};
