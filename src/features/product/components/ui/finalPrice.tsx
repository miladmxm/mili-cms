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

export const TotalMetadataPriceWithDiscount = ({
  metadata,
}: {
  metadata: Product["metadata"];
}) => {
  const totalPrice = metadata.reduce((acc, item) => {
    const discountedPrice = calcDiscount([item]);
    return acc + discountedPrice;
  }, 0);

  return <>{formatNumber(Math.round(totalPrice / 10))} تومان</>;
};
