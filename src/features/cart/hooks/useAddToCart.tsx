import { useTransition } from "react";
import { toast } from "sonner";

import GoToCartToast from "@/features/auth/customer/components/goToCart";
import { openAuthDialog } from "@/features/auth/customer/store/auth";
import { useSession } from "@/hooks/useSession";

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
  const { data } = useSession();

  const handleAddToCart = async () => {
    if (!data?.user.id) {
      openAuthDialog();
      return;
    }

    startTransition(async () => {
      const result = await addToCartAction({
        productId,
        quantity,
        metadataId,
      });

      if (result.success) {
        toast.success(<GoToCartToast title="با موفقیت به سبد خرید اضافه شد" />);
      } else {
        toast.error(result.error || "خطا در افزودن به سبد خرید");
      }
    });
  };

  return { handleAddToCart, isPedding };
};
