import { useTransition } from "react";
import { toast } from "sonner";

import { deleteArticleAction } from "../actions/delete";

export const useDeleteArticle = (id: string) => {
  const [isPending, startTransition] = useTransition();
  const handleClickToDelete = () => {
    startTransition(async () => {
      const { success, message } = await deleteArticleAction(id);
      toast[success ? "success" : "error"](message);
    });
  };
  return {
    isPending,
    handleClickToDelete,
  };
};
