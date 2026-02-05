import * as v from "valibot";

import type { ArticleStatus } from "../../../services/article/types";

import { CreateArticleSchema } from "./createSchema";

export const StatusSchema = v.pipe(
  v.picklist<ArticleStatus[]>(["archived", "draft", "published"]),
);
export const UpdateArticleSchema = v.partial(CreateArticleSchema);
export type UpdateArticle = v.InferOutput<typeof UpdateArticleSchema>;
export const UpdateStatusSchema = v.object({
  status: StatusSchema,
});
export type UpdateStatus = v.InferOutput<typeof UpdateStatusSchema>;
