import * as v from "valibot";

export const CreateArticleSchema = v.object({
  title: v.pipe(v.string(), v.nonEmpty("عنوان نباید خالی باشد")),
  excerpt: v.pipe(v.string(), v.nonEmpty("خلاصه ای از مقاله بنویسید")),
  content: v.pipe(v.string(), v.nonEmpty("مقدار محتوا الزامی است")),
  slug: v.pipe(v.string(), v.nonEmpty("مقدال slug را وارد کنید")),
  thumbnail: v.optional(v.pipe(v.string(), v.nonEmpty())),
});
export type CreateArticleInput = v.InferInput<typeof CreateArticleSchema>;
