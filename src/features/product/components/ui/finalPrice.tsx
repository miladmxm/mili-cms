import type { Product } from "@/services/product/type";

import { formatNumber } from "@/lib/formatNumber";

import { calcDiscount } from "../../utils/calcDiscount";
import { convertMetadataToIRT } from "../../utils/convertToIRT";

export const FormatedPrice = ({
  metadata,
}: {
  metadata: Product["metadata"];
}) => {
  return <>{formatNumber(convertMetadataToIRT(metadata))}</>;
};

export const DiscountedPrice = ({
  metadata,
}: {
  metadata: Product["metadata"];
}) => {
  return <>{formatNumber(calcDiscount(metadata) / 10)} تومان</>;
};
