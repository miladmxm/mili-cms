import { useTransition } from "react";
import { toast } from "sonner";

import { deleteCommentAction } from "../actions/delete";

export const useDeleteComment = (id: string) => {
  const [isPending, startTransition] = useTransition();

  const handleClickToDelete = () => {
    startTransition(async () => {
      const { success, message } = await deleteCommentAction(id);
      toast[success ? "success" : "error"](message);
    });
  };

  return {
    isPending,
    handleClickToDelete,
  };
};
