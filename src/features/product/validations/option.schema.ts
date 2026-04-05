import * as v from "valibot";

const OptionItemSchema = v.object({
  id: v.optional(v.string()),
  label: v.pipe(
    v.string("مقدار برچسب اجباری است"),
    v.nonEmpty("نمی‌تواند خالی باشد"),
  ),
  value: v.pipe(v.string("مقدار اجباری است"), v.nonEmpty("نباید خالی باشد")),
});
export const CreateOptionSchema = v.object({
  name: v.pipe(v.string("نام اجباری است"), v.nonEmpty("نام نباید خالی باشد")),
  slug: v.pipe(v.string("slug اجباری است"), v.nonEmpty("slug نباید خالی باشد")),
  description: v.optional(
    v.pipe(v.string("slug اجباری است"), v.nonEmpty("slug نباید خالی باشد")),
  ),
  items: v.array(OptionItemSchema),
});

export type CreateOptionInput = v.InferInput<typeof CreateOptionSchema>;

export const EditOptionSchema = v.object({
  ...v.partial(CreateOptionSchema).entries,
  deletedOptionItemIds: v.optional(v.array(v.string())),
});
export type EditOptionInput = v.InferInput<typeof EditOptionSchema>;
