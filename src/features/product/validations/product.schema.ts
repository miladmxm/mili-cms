import * as v from "valibot";

import type { ProductStatus } from "@/services/product/type";

import { ProseMirrorSchema } from "@/validations/proseMirror";

export const StatusSchema = v.picklist<ProductStatus[]>([
  "archived",
  "draft",
  "published",
]);

export const CreateProductBaseSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("نام نباید خالی باشد")),
  excerpt: v.pipe(v.string(), v.nonEmpty("خلاصه ای از مقاله بنویسید")),
  content: ProseMirrorSchema,
  slug: v.pipe(v.string(), v.nonEmpty("مقدار slug را وارد کنید")),
  status: StatusSchema,
  thumbnail: v.union([
    v.pipe(
      v.object({
        id: v.pipe(v.string(), v.nonEmpty("یک تصویر شاخص انتخاب کنید")),
        url: v.pipe(v.string(), v.nonEmpty()),
      }),
      v.transform(({ id }) => id),
    ),
    v.string(),
  ]),

  categoryIds: v.array(v.pipe(v.string(), v.nonEmpty())),
  gallery: v.optional(
    v.array(
      v.pipe(
        v.object({
          id: v.pipe(v.string(), v.nonEmpty("یک تصویر انتخاب کنید")),
          url: v.pipe(v.string(), v.nonEmpty()),
        }),
        v.transform(({ id }) => id),
      ),
    ),
    [],
  ),
});
export const CreateProductSchema = v.variant("type", [
  v.object({
    ...CreateProductBaseSchema.entries,
    type: v.literal("default"),
    metadata: v.pipe(
      v.array(
        v.object({
          price: v.object({
            amount: v.number(),
            currency: v.picklist(["IRR"]),
          }),
          stock: v.optional(v.number(), -1),
          thumbnail: v.string(),
        }),
      ),
      v.minLength(1),
    ),
  }),
  v.object({
    ...CreateProductBaseSchema.entries,
    type: v.literal("variable"),
    metadata: v.pipe(
      v.array(
        v.object({
          price: v.object({
            amount: v.number(),
            currency: v.picklist(["IRR"]),
          }),
          stock: v.optional(v.number(), -1),
          thumbnail: v.string(),
          optionItemIds: v.string(),
        }),
      ),
      v.minLength(1),
    ),
  }),
]);
export type CreateProductInput = v.InferInput<typeof CreateProductSchema>;
export type CreateProductOutput = v.InferOutput<typeof CreateProductSchema>;

// export const UpdateProductSchema = v.partial(CreateProductSchema);
// export type UpdateProduct = v.InferOutput<typeof UpdateProductSchema>;

// export const UpdateStatusSchema = v.object({
//   status: StatusSchema,
// });
// export type UpdateStatus = v.InferOutput<typeof UpdateStatusSchema>;
