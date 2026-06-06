"use client";

import type { Product } from "@/services/product/type";

import { DiscountedPrice } from "@/features/product/components/ui/finalPrice";
import { cn } from "@/lib/utils";

const Price = ({
  metadata,
  className,
}: {
  metadata: Product["metadata"];
  className?: string;
}) => {
  return (
    <div
      className={cn("text-xl font-bold text-gray-500 flex gap-4", className)}
    >
      <span>قیمت:</span>
      <DiscountedPrice metadata={metadata} />
    </div>
  );
};

export default Price;
