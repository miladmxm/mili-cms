import { useTransition } from "react";
import { toast } from "sonner";

import { deleteFile } from "../actions/deleteFile";

export const useDeleteFile = (id: string) => {
  const [isPending, startTransition] = useTransition();

  const handleClickToDelete = () => {
    startTransition(async () => {
      const { success, message } = await deleteFile(id);

      if (!success) {
        toast.error(message);
      }
    });
  };

  return { isPending, handleClickToDelete };
};
