import { useState, useTransition } from "react";

import type { ArticleStatus } from "../../../services/article/types";

// import { updateArticleStatus } from "../actions/update";

export const useChangeStatus = (id: string, defaultValue: ArticleStatus) => {
  const [isPending, startTransition] = useTransition();
  const [value] = useState<ArticleStatus>(defaultValue);

  const handleChange = () => {
    if (isPending) return;
    startTransition(async () => {
      // const { message, success } = await updateArticleStatus(id, status);
      // if (!success) {
      //   toast.error(message);
      // } else {
      //   setValue(status);
      //   toast.success(message);
      // }
    });
  };

  return { handleChange, isPending, value };
};
