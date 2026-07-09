import { useTransition } from "react";
import { toast } from "sonner";

import { removeFromCartAction } from "../actions/delete";

export const useRemoveFromCart = (id: string) => {
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    startTransition(async () => {
      const { success, error } = await removeFromCartAction(id);
      if (!success) toast.error("از سبد خرید حذف نشد", { description: error });
      toast.success("با موفقیت حذف شد");
    });
  };

  return { isPending, handleRemove };
};
