"use client";

import { toast } from "sonner";

import Button from "@/components/ui/button";
import ButtonWithArrow from "@/components/ui/buttonWithArrow";
import { addToCartAction } from "@/features/cart/actions/addToCart";

import { useProductPageContext } from "../_context";
import { useGetMetadata } from "../_hooks/useGetMetadata";
import { useQuantityContext } from "../_store/quantityStore";
import { useSelectVariableContext } from "../_store/variableSelectionStore";

const AddToCart = () => {
  const metadata = useGetMetadata();
  const quantity = useQuantityContext((s) => s.quantity);
  const selectedVariables = useSelectVariableContext(
    (store) => store.selectedVariables,
  );
  const { product } = useProductPageContext();
  const { stock } = metadata;
  const isDisabled =
    stock === 0 ||
    (product.type === "variable" &&
      Object.keys(selectedVariables).length !== product.variables.length);

  const handleAddToCart = async () => {
    const result = await addToCartAction({
      productId: product.id,
      quantity,
      metadataId: metadata.id,
    });

    if (result.success) {
      toast.success("به سبد خرید اضافه شد");
    } else {
      toast.error(result.error || "خطا در افزودن به سبد خرید");
    }
  };

  return (
    <>
      <ButtonWithArrow
        containerClassName="max-w-1/3 max-md:hidden"
        disabled={isDisabled}
        onClick={handleAddToCart}
      >
        افزودن به سبد خرید
      </ButtonWithArrow>
      <Button
        className="md:hidden "
        size="base"
        variant="secondary"
        disabled={isDisabled}
        onClick={handleAddToCart}
      >
        افزودن به سبد خرید
      </Button>
    </>
  );
};

export default AddToCart;
