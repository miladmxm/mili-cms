import { valibotResolver } from "@hookform/resolvers/valibot";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { UpdateProductOutput } from "../validations/product.schema";

import { updateProductAction } from "../actions/update";
import { useEditProductContextRequire } from "../context/editProduct";
import { EditProductSchema } from "../validations/product.schema";

export const useEditProduct = () => {
  const { product } = useEditProductContextRequire();

  const form = useForm({
    resolver: valibotResolver(EditProductSchema),
    defaultValues: {
      ...product,
      metadata:
        product.type === "variable"
          ? product.metadata.reduce(
              (prev, current) => ({
                ...prev,
                [current.optionItemIds]: current,
              }),
              {},
            )
          : { "0": product.metadata[0] },
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: UpdateProductOutput) => {
    // const dirtyData = getItemsDirtyData(data, form.formState.dirtyFields);

    startTransition(async () => {
      const { success, message } = await updateProductAction(product.id, data);

      if (!success) toast.error(message);
      else {
        toast.success(message);
      }
    });
  };

  return {
    isPending,
    submit: form.handleSubmit(onSubmit),
    form,
  };
};
