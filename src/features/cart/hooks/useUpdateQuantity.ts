import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";

import { updateCartItemQuantity } from "../actions/update";

export const useUpdateQuantity = ({
  id,
  quantity,
}: {
  quantity: number;
  id: string;
}) => {
  const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(quantity);
  const [isPending, startTransition] = useTransition();

  const handleChange = (newQuantity: number) => {
    if (isPending) return;
    startTransition(async () => {
      setOptimisticQuantity(newQuantity);
      const { success, error } = await updateCartItemQuantity(id, newQuantity);
      if (!success) toast.error("تعداد تغییر نکرد", { description: error });
    });
  };

  return { isPending, optimisticQuantity, handleChange };
};
