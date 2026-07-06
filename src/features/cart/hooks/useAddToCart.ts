import { useTransition } from "react";
import { toast } from "sonner";

import { addToCartAction } from "../actions/create";

export const useAddToCart = ({
  productId,
  quantity,
  metadataId,
}: {
  productId: string;
  quantity: number;
  metadataId: string;
}) => {
  const [isPedding, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const result = await addToCartAction({
        productId,
        quantity,
        metadataId,
      });

      if (result.success) {
        toast.success("به سبد خرید اضافه شد");
      } else {
        toast.error(result.error || "خطا در افزودن به سبد خرید");
      }
    });
  };

  return { handleAddToCart, isPedding };
};
