import * as v from "valibot";

export const CreateProductCommentSchema = v.object({
  content: v.pipe(v.string(), v.nonEmpty()),
  authorId: v.pipe(v.string(), v.nonEmpty()),
});

export type CreateProductCommentInput = v.InferInput<
  typeof CreateProductCommentSchema
>;
