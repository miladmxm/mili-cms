import { useAddToCart } from "@/features/cart/hooks/useAddToCart";

import { useProductPageContext } from "../_context";
import { useGetMetadata } from "../_hooks/useGetMetadata";
import { useQuantityContext } from "../_store/quantityStore";
import { useSelectVariableContext } from "../_store/variableSelectionStore";

export const useAddToCartHandler = () => {
  const metadata = useGetMetadata();
  const quantity = useQuantityContext((s) => s.quantity);
  const selectedVariables = useSelectVariableContext(
    (store) => store.selectedVariables,
  );
  const { product } = useProductPageContext();
  const { stock } = metadata;

  const { handleAddToCart, isPedding } = useAddToCart({
    productId: product.id,
    quantity,
    metadataId: metadata.id,
  });
  const isLargerThanStock = metadata.stock >= 0 && quantity > metadata.stock;
  const isDisabled =
    isPedding ||
    stock === 0 ||
    isLargerThanStock ||
    (product.type === "variable" &&
      Object.keys(selectedVariables).length !== product.variables.length);
  return { isDisabled, isPedding, handleAddToCart, isLargerThanStock };
};
