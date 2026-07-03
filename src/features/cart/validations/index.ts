import * as v from "valibot";

export const AddToCartInputSchema = v.object({
  productId: v.pipe(v.string(), v.nonEmpty()),
  quantity: v.optional(v.pipe(v.number(), v.minValue(1)), 1),
  metadataId: v.pipe(v.string(), v.nonEmpty()),
});
