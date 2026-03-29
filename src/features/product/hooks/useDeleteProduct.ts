import { useTransition } from "react";

// import { deleteArticleAction } from "../actions/delete";

export const useDeleteProduct = (id: string) => {
  const [isPending, startTransition] = useTransition();
  const handleClickToDelete = () => {
    startTransition(async () => {
      // const { success, message } = await deleteArticleAction(id);
      // toast[success ? "success" : "error"](message);
    });
  };
  return {
    isPending,
    handleClickToDelete,
  };
};
