import * as v from "valibot";

import type { ProductStatus } from "@/services/product/type";

import { ThumbnailSchema } from "@/validations/mainSchemas";
import { ProseMirrorSchema } from "@/validations/proseMirror";

export const StatusSchema = v.picklist<ProductStatus[]>([
  "archived",
  "draft",
  "published",
]);
const PriceSchema = v.object({
  amount: v.union([
    v.number(),
    v.pipe(
      v.string(),
      v.nonEmpty(),
      v.transform((s) => Number(s)),
      v.number(),
    ),
  ]),
  currency: v.optional(v.picklist(["IRR"]), "IRR"),
});
const StockSchema = v.optional(
  v.union([
    v.number(),
    v.pipe(
      v.string(),
      v.nonEmpty(),
      v.transform((s) => Number(s)),
      v.number(),
    ),
  ]),
  -1,
);
export const CreateProductBaseSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("نام نباید خالی باشد")),
  excerpt: v.pipe(v.string(), v.nonEmpty("خلاصه ای از مقاله بنویسید")),
  content: ProseMirrorSchema,
  slug: v.pipe(v.string(), v.nonEmpty("مقدار slug را وارد کنید")),
  status: StatusSchema,
  thumbnailId: ThumbnailSchema,
  categoryIds: v.array(v.pipe(v.string(), v.nonEmpty())),
  gallery: v.optional(v.array(ThumbnailSchema), []),
});
export const CreateProductSchema = v.variant("type", [
  v.object({
    ...CreateProductBaseSchema.entries,
    type: v.literal("default"),
    metadata: v.pipe(
      v.array(
        v.object({
          price: PriceSchema,
          stock: StockSchema,
        }),
      ),
      v.minLength(1),
      v.maxLength(1),
    ),
  }),
  v.object({
    ...CreateProductBaseSchema.entries,
    type: v.literal("variable"),
    metadata: v.pipe(
      v.array(
        v.object({
          price: PriceSchema,
          stock: StockSchema,
          thumbnailId: ThumbnailSchema,
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
