"use client";

import Button from "@/components/ui/button";
import ButtonWithArrow from "@/components/ui/buttonWithArrow";

import { useProductPageContext } from "../_context";
import { useGetMetadata } from "../_hooks/useGetMetadata";
import { useSelectVariableContext } from "../_store/variableSelectionStore";

const AddToCart = () => {
  const metadata = useGetMetadata();
  const selectedVariables = useSelectVariableContext(
    (store) => store.selectedVariables,
  );
  const { product } = useProductPageContext();
  const { stock } = metadata;
  console.log(selectedVariables, product, stock);
  const isDisabled =
    stock === 0 ||
    (product.type === "variable" &&
      Object.keys(selectedVariables).length !== product.variables.length);
  return (
    <>
      <ButtonWithArrow
        containerClassName="max-w-1/3 max-md:hidden"
        disabled={isDisabled}
      >
        افزودن به سبد خرید
      </ButtonWithArrow>
      <Button
        className="md:hidden "
        size="base"
        variant="secondary"
        disabled={isDisabled}
      >
        افزودن به سبد خرید
      </Button>
    </>
  );
};

export default AddToCart;
