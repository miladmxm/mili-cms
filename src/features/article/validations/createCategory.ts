import * as v from "valibot";

export const CreateCategorySchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("نام دسته بندی الزامی است")),
  slug: v.pipe(v.string(), v.nonEmpty("مقدار slug را وارد کنید")),
  description: v.optional(v.pipe(v.string(), v.nonEmpty())),
  thumbnail: v.optional(v.pipe(v.string(), v.nonEmpty())),
  parentId: v.optional(v.pipe(v.string(), v.nonEmpty())),
});
export type CreateCategoryOutput = v.InferOutput<typeof CreateCategorySchema>;
