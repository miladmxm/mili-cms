import type { Product } from "@/services/product/type";

export const calcDiscount = (metadata: Product["metadata"]) => {
  const { discount, price } = metadata[0];
  if (discount === 0) return price;
  const finalPrice = (price / 100) * (100 - discount);
  return finalPrice;
};
