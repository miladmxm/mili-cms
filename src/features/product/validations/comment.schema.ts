import * as v from "valibot";

export const ProductCommentContentSchema = v.object({
  content: v.pipe(v.string(), v.nonEmpty("این مورد نمی‌تواند خالی باشد")),
  rating: v.optional(v.pipe(v.number(), v.minValue(1), v.maxValue(5))),
});
export type ProductCommentContentOutput = v.InferOutput<
  typeof ProductCommentContentSchema
>;
