import type { Product } from "@/services/product/type";

import { OPTION_ITEM_IDS_SEPARATOR } from "@/features/product/constant";

import { useProductPageContext } from "../_context";
import { useSelectVariableContext } from "../_store/variableSelectionStore";

export const useGetMetadata = () => {
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

  return metadata;
};
