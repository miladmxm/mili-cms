"use client";

import type { Product } from "@/services/product/type";

import { formatNumber } from "@/lib/formatNumber";

import { calcDiscount } from "../../utils/calcDiscount";
import { convertMetadataToIRT } from "../../utils/convertToIRT";

export const FormatedPrice = ({
  metadata,
}: {
  metadata: Product["metadata"];
}) => {
  return <>{formatNumber(Math.round(convertMetadataToIRT(metadata)))}</>;
};

export const DiscountedPrice = ({
  metadata,
}: {
  metadata: Product["metadata"];
}) => {
  return <>{formatNumber(Math.round(calcDiscount(metadata) / 10))} تومان</>;
};
