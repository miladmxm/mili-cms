import { useState, useTransition } from "react";
import { toast } from "sonner";

import type { ProductStatus } from "@/services/product/type";

import { updateProductStatus } from "../actions/update";

export const useChangeStatus = (id: string, defaultValue: ProductStatus) => {
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
