import * as v from "valibot";

import { CreateArticleSchema, StatusSchema } from "./createSchema";

export const UpdateArticleSchema = v.partial(CreateArticleSchema);
export type UpdateArticle = v.InferOutput<typeof UpdateArticleSchema>;

export const UpdateStatusSchema = v.object({
  status: StatusSchema,
});
export type UpdateStatus = v.InferOutput<typeof UpdateStatusSchema>;
