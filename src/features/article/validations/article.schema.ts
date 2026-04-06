import * as v from "valibot";

import type { ArticleStatus } from "@/services/article/types";

import { ThumbnailSchema } from "@/validations/mainSchemas";
import { ProseMirrorSchema } from "@/validations/proseMirror";

export const StatusSchema = v.picklist<ArticleStatus[]>([
  "archived",
  "draft",
  "published",
]);

export const CreateArticleSchema = v.object({
  title: v.pipe(v.string(), v.nonEmpty("عنوان نباید خالی باشد")),
  excerpt: v.pipe(v.string(), v.nonEmpty("خلاصه ای از مقاله بنویسید")),
  content: ProseMirrorSchema,
  slug: v.pipe(v.string(), v.nonEmpty("مقدار slug را وارد کنید")),
  status: StatusSchema,
  thumbnail: ThumbnailSchema,
  categoryIds: v.array(v.pipe(v.string(), v.nonEmpty())),
});

export type CreateArticleInput = v.InferInput<typeof CreateArticleSchema>;
export type CreateArticleOutput = v.InferOutput<typeof CreateArticleSchema>;

export const UpdateArticleSchema = v.partial(CreateArticleSchema);
export type UpdateArticle = v.InferOutput<typeof UpdateArticleSchema>;

export const UpdateStatusSchema = v.object({
  status: StatusSchema,
});
export type UpdateStatus = v.InferOutput<typeof UpdateStatusSchema>;
