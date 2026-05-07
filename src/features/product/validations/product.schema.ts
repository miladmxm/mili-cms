import * as v from "valibot";

import type { ProductStatus } from "@/services/product/type";

import {
  ThumbnailNotNullSchema,
  ThumbnailSchema,
} from "@/validations/mainSchemas";
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
  thumbnail: ThumbnailSchema,
  categoryIds: v.array(v.pipe(v.string(), v.nonEmpty())),
  gallery: v.pipe(v.optional(v.array(ThumbnailNotNullSchema), [])),
});

const metadataArraySchemaGenerator = <
  T extends Record<string, v.GenericSchema>,
>(
  schema: T,
) => {
  return v.pipe(
    v.record(v.string(), v.object(schema)),
    v.transform((data) => Object.values(data)),
    v.minLength(1),
  );
};

const metadataSchemaGenerator = <T extends Record<string, v.GenericSchema>>(
  schema: T,
) => {
  return v.pipe(
    v.record(v.string(), v.object(schema)),
    v.custom((t) => Object.keys(t as object).length > 0),
  );
};

export const CreateProductSchema = v.variant("type", [
  v.object({
    ...CreateProductBaseSchema.entries,
    type: v.literal("default"),
    metadata: metadataArraySchemaGenerator({
      price: PriceSchema,
      stock: StockSchema,
    }),
  }),
  v.object({
    ...CreateProductBaseSchema.entries,
    type: v.literal("variable"),
    metadata: metadataArraySchemaGenerator({
      price: PriceSchema,
      stock: StockSchema,
      thumbnail: ThumbnailSchema,
      optionItemIds: v.string(),
    }),
  }),
]);
export type CreateProductInput = v.InferInput<typeof CreateProductSchema>;
export type CreateProductOutput = v.InferOutput<typeof CreateProductSchema>;

export const EditProductSchema = v.variant("type", [
  v.object({
    ...CreateProductBaseSchema.entries,
    type: v.literal("default"),
    metadata: metadataSchemaGenerator({
      price: PriceSchema,
      stock: StockSchema,
    }),
  }),
  v.object({
    ...CreateProductBaseSchema.entries,
    type: v.literal("variable"),
    metadata: metadataSchemaGenerator({
      price: PriceSchema,
      stock: StockSchema,
      thumbnail: ThumbnailSchema,
      optionItemIds: v.string(),
    }),
  }),
]);
export type UpdateProductOutput = v.InferOutput<typeof EditProductSchema>;

// export const UpdateStatusSchema = v.object({
//   status: StatusSchema,
// });
// export type UpdateStatus = v.InferOutput<typeof UpdateStatusSchema>;
