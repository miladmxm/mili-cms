import * as v from "valibot";

export const ProductCommentContentSchema = v.object({
  content: v.pipe(v.string(), v.nonEmpty("این مورد نمی‌تواند خالی باشد")),
});
export type ProductCommentContentOutput = v.InferOutput<
  typeof ProductCommentContentSchema
>;
