"use client";

import Button from "@/components/ui/button";
import ButtonWithArrow from "@/components/ui/buttonWithArrow";
import Spiner from "@/components/ui/spiner";

import { useAddToCartHandler } from "../_hooks/useAddToCartHandler";

const AddToCart = () => {
  const { handleAddToCart, isDisabled, isPedding } = useAddToCartHandler();

  return (
    <>
      <ButtonWithArrow
        containerClassName="max-w-1/3 max-md:hidden"
        disabled={isDisabled}
        onClick={handleAddToCart}
        icon={isPedding ? <Spiner /> : undefined}
      >
        افزودن به سبد خرید
      </ButtonWithArrow>
      <Button
        className="md:hidden flex items-center justify-center gap-2"
        size="base"
        variant="secondary"
        disabled={isDisabled}
        onClick={handleAddToCart}
      >
        افزودن به سبد خرید
        {isPedding && <Spiner />}
      </Button>
    </>
  );
};

export default AddToCart;
