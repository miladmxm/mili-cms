import { useTransition } from "react";
import { toast } from "sonner";

import { deletePortfolioAction } from "../actions/delete";

export const useDeletePortfolio = (id: string) => {
  const [isPending, startTransition] = useTransition();

  const handleClickToDelete = () => {
    startTransition(async () => {
      const { success, message } = await deletePortfolioAction(id);
      toast[success ? "success" : "error"](message);
    });
  };

  return {
    isPending,
    handleClickToDelete,
  };
};
