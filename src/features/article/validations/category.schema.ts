import * as v from "valibot";

export const CreateCategorySchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("نام دسته بندی الزامی است")),
  slug: v.pipe(v.string(), v.nonEmpty("مقدار slug را وارد کنید")),
  description: v.optional(
    v.pipe(
      v.string(),
      v.transform((str) => (str === "" ? undefined : str)),
    ),
  ),
  thumbnail: v.optional(
    v.union([
      v.pipe(
        v.object({
          id: v.pipe(v.string(), v.nonEmpty()),
          url: v.pipe(v.string(), v.nonEmpty()),
        }),
        v.transform(({ id }) => id),
      ),
      v.pipe(v.string(), v.nonEmpty()),
    ]),
  ),
  parentId: v.optional(v.pipe(v.string(), v.nonEmpty())),
});
export type CreateCategoryInput = v.InferInput<typeof CreateCategorySchema>;

export type CreateCategoryOutput = v.InferOutput<typeof CreateCategorySchema>;

export const UpdateCategorySchema = v.partial(CreateCategorySchema);
export type UpdateCategoryInput = v.InferInput<typeof UpdateCategorySchema>;

export type UpdateCategoryOutput = v.InferOutput<typeof UpdateCategorySchema>;
