import { useState, useTransition } from "react";
import { toast } from "sonner";

import type { ProductStatus } from "@/services/product/type";

import type { ArticleStatus } from "../../../services/article/types";

import { updateProductStatus } from "../actions/update";

export const useChangeStatus = (id: string, defaultValue: ArticleStatus) => {
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState<ProductStatus>(defaultValue);

  const handleChange = (status: ProductStatus) => {
    if (isPending) return;
    startTransition(async () => {
      const { message, success } = await updateProductStatus(id, status);

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
