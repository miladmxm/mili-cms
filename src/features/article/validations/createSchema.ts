import * as v from "valibot";

import type { ArticleStatus } from "@/services/article/types";

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
  thumbnail: v.optional(
    v.pipe(v.string(), v.nonEmpty("یک تصویر شاخص انتخاب کنید")),
  ),
  categoryIds: v.array(v.pipe(v.string(), v.nonEmpty())),
});
export type CreateArticleOutput = v.InferOutput<typeof CreateArticleSchema>;
