import * as v from "valibot";

export const ThumbnailSchema = v.optional(
  v.union([
    v.pipe(
      v.object({
        id: v.pipe(v.string(), v.nonEmpty("یک تصویر شاخص انتخاب کنید")),
        url: v.pipe(v.string(), v.nonEmpty()),
      }),
      v.transform(({ id }) => id),
    ),
    v.nullable(v.string()),
  ]),
);
export const ThumbnailNotNullSchema = v.union([
  v.pipe(
    v.object({
      id: v.pipe(v.string(), v.nonEmpty("یک تصویر شاخص انتخاب کنید")),
      url: v.pipe(v.string(), v.nonEmpty()),
    }),
    v.transform(({ id }) => id),
  ),
  v.string(),
]);
