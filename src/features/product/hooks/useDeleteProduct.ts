import { useTransition } from "react";
import { toast } from "sonner";

import { deleteProductAction } from "../actions/delete";

export const useDeleteProduct = (id: string) => {
  const [isPending, startTransition] = useTransition();

  const handleClickToDelete = () => {
    startTransition(async () => {
      const { success, message } = await deleteProductAction(id);
      toast[success ? "success" : "error"](message);
    });
  };

  return {
    isPending,
    handleClickToDelete,
  };
};
