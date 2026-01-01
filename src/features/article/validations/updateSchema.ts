import * as v from "valibot";

import type { ArticleStatus } from "../types";

export const StatusSchema = v.pipe(
  v.picklist<ArticleStatus[]>(["archived", "draft", "published"]),
);

export const UpdateStatusSchema = v.object({
  status: StatusSchema,
});
export type UpdateStatus = v.InferOutput<typeof UpdateStatusSchema>;
