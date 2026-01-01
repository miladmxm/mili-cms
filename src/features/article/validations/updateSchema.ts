import * as v from "valibot";

import type { ArticleStatus } from "../types";

export const UpdateStatusSchema = v.pipe(
  // v.string(),
  // v.nonEmpty(),
  v.picklist<ArticleStatus[]>(["archived", "draft", "published"]),
);

export type UpdateStatus = v.InferOutput<typeof UpdateStatusSchema>;
