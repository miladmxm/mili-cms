import { useTransition } from "react";
import { toast } from "sonner";

import { deleteOptionAction } from "../actions/delete";

export const useDeleteOption = (id: string) => {
  const [isPending, startTransition] = useTransition();
  const handleClickToDelete = () => {
    startTransition(async () => {
      const { success, message } = await deleteOptionAction(id);
      toast[success ? "success" : "error"](message);
    });
  };
  return {
    isPending,
    handleClickToDelete,
  };
};
