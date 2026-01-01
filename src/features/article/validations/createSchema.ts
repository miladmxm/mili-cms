import * as v from "valibot";

import { StatusSchema } from "./updateSchema";

export const CreateArticleSchema = v.object({
  title: v.pipe(v.string(), v.nonEmpty("عنوان نباید خالی باشد")),
  excerpt: v.pipe(v.string(), v.nonEmpty("خلاصه ای از مقاله بنویسید")),
  content: v.pipe(v.string(), v.nonEmpty("مقدار محتوا الزامی است")),
  slug: v.pipe(v.string(), v.nonEmpty("مقدال slug را وارد کنید")),
  status: StatusSchema,
  thumbnail: v.optional(
    v.pipe(v.string(), v.nonEmpty("یک تصویر شاخص انتخاب کنید")),
  ),
});
export type CreateArticleOutput = v.InferOutput<typeof CreateArticleSchema>;
