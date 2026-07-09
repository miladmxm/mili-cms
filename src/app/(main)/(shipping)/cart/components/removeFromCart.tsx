"use client";

import Close from "@/assets/icons/close.svg";
import Button from "@/components/ui/button";
import Spiner from "@/components/ui/spiner";
import { useRemoveFromCart } from "@/features/cart/hooks/useRemoveFromCart";

const RemoveFromCart = ({ id }: { id: string }) => {
  const { handleRemove, isPending } = useRemoveFromCart(id);
  return (
    <Button
      onClick={handleRemove}
      disabled={isPending}
      variant="default"
      className="size-fit"
    >
      {isPending ? <Spiner /> : <Close className="size-3" />}
    </Button>
  );
};

export default RemoveFromCart;
