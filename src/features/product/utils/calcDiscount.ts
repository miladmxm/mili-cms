import type { Product } from "@/services/product/type";

import { discountCalculation } from "@/services/product/utils";

type Metadata = Product["metadata"];

export const getMaxDiscount = (metadata: Metadata): number => {
  return Math.max(...metadata.map(({ discount }) => discount));
};

export const findMaxDiscountItem = (
  metadata: Metadata,
): Metadata[number] | undefined => {
  return metadata.find((item) => item.discount === getMaxDiscount(metadata));
};

export const calcDiscount = (metadata: Metadata) => {
  const maxDiscountItem = findMaxDiscountItem(metadata);
  if (!maxDiscountItem) return metadata[0].price;
  const { price, discount } = maxDiscountItem;
  if (discount === 0) return price;
  const finalPrice = discountCalculation({ discount, price });
  return finalPrice;
};

export const haveDiscount = (metadata: Metadata): boolean => {
  return !metadata.every(({ discount }) => discount === 0);
};
