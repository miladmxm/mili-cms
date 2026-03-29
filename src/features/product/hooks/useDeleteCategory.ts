import { useTransition } from "react";

// import { deleteCategoryAction } from "../actions/delete";

export const useDeleteCategory = (id: string) => {
  const [isPending, startTransition] = useTransition();
  const handleClickToDelete = () => {
    startTransition(async () => {
      // const { success, message } = await deleteCategoryAction(id);
      // toast[success ? "success" : "error"](message);
    });
  };
  return {
    isPending,
    handleClickToDelete,
  };
};
