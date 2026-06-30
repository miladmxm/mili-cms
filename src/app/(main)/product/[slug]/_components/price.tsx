"use client";

import type { Product } from "@/services/product/type";

import { DiscountedPrice } from "@/features/product/components/ui/finalPrice";
import { OPTION_ITEM_IDS_SEPARATOR } from "@/features/product/constant";
import { cn } from "@/lib/utils";

import { useProductPageContext } from "../context";
import { useSelectVariableContext } from "../store/variableSelectionStore";

const Price = ({ className }: { className?: string }) => {
  const selectedVariables = useSelectVariableContext(
    (store) => store.selectedVariables,
  );
  const { product } = useProductPageContext();
  let metadata: Product["metadata"][number];

  if (product.type === "variable") {
    metadata =
      product.metadata.find(
        ({ optionItemIds }) =>
          optionItemIds ===
          Object.values(selectedVariables)
            .sort()
            .join(OPTION_ITEM_IDS_SEPARATOR),
      ) || product.metadata[0];
  } else {
    metadata = product.metadata[0];
  }

  return (
    <div
      className={cn("text-xl font-bold text-gray-500 flex gap-4", className)}
    >
      <span>قیمت:</span>
      <DiscountedPrice metadata={[metadata]} />
    </div>
  );
};

export default Price;
