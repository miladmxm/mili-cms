import { useOptimistic, useTransition } from "react";
import { toast } from "sonner";

import type { CommentType } from "@/services/comment/type";

import { updateComment } from "../actions/update";

export const useChangeType = (id: string, defaultValue: CommentType) => {
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useOptimistic<CommentType>(defaultValue);

  const handleChange = (type: CommentType) => {
    if (isPending) return;
    startTransition(async () => {
      setValue(type);
      const { success, message } = await updateComment(id, { type });

      if (!success) {
        toast.error(message);
      } else {
        setValue(type);
        toast.success(message);
      }
    });
  };

  return { handleChange, isPending, value };
};
