import { useState, useTransition } from "react";
import { toast } from "sonner";

import type { ArticleStatus } from "../types";

import { updateArticleStatus } from "../actions/update";

export const useChangeStatus = (id: string, defaultValue: ArticleStatus) => {
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState<ArticleStatus>(defaultValue);
  const handleChange = (status: ArticleStatus) => {
    if (isPending) return;
    startTransition(async () => {
      const { message, success } = await updateArticleStatus(id, status);
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
