import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";

import type { CommentStatus } from "@/services/comment/type";

import { updateComment } from "../actions/update";

export const useChangeStatus = (id: string, defaultValue: CommentStatus) => {
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useOptimistic<CommentStatus>(defaultValue);

  const handleChange = (status: CommentStatus) => {
    if (isPending) return;
    startTransition(async () => {
      setValue(status);
      const { success, message } = await updateComment(id, { status });

      if (!success) {
        toast.error(message);
      } else {
        setValue(status);
        toast.success(message);
      }
    });
  };

  return { handleChange, isPending, value };
};
