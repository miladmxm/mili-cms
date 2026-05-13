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

const StringToNumberPipe = v.pipe(
  v.string(),
  v.nonEmpty(),
  v.transform((s) => Number(s)),
  v.number(),
);

const StockSchema = v.optional(v.union([v.number(), StringToNumberPipe]), -1);
const DiscountSchema = v.optional(
  v.union([
    v.number(),
    v.pipe(
      StringToNumberPipe,
      v.maxValue(100, "فقط بین ۰ تا ۱۰۰"),
      v.minValue(0, "فقط بین ۰ تا ۱۰۰"),
    ),
  ]),
  0,
);

const DefaultMetaData = v.object({
  price: v.union([v.number(), StringToNumberPipe]),
  currency: v.optional(v.picklist(["IRR"]), "IRR"),
  stock: StockSchema,
  discount: DiscountSchema,
});

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
      price: v.union([v.number(), StringToNumberPipe]),
      stock: StockSchema,
      discount: DiscountSchema,
    }),
  }),
  v.object({
    ...CreateProductBaseSchema.entries,
    type: v.literal("variable"),
    metadata: metadataArraySchemaGenerator({
      ...DefaultMetaData.entries,
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
      ...DefaultMetaData.entries,
    }),
  }),
  v.object({
    ...CreateProductBaseSchema.entries,
    type: v.literal("variable"),
    metadata: metadataSchemaGenerator({
      ...DefaultMetaData.entries,
      thumbnail: ThumbnailSchema,
      optionItemIds: v.string(),
      discount: DiscountSchema,
    }),
  }),
]);
export type UpdateProductOutput = v.InferOutput<typeof EditProductSchema>;

export const UpdateStatusSchema = v.object({
  status: StatusSchema,
});
export type UpdateStatus = v.InferOutput<typeof UpdateStatusSchema>;
