import { valibotResolver } from "@hookform/resolvers/valibot";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { getItemsDirtyData } from "@/utils/dirtyValues";

import type { UpdateProductOutput } from "../validations/product.schema";

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
  // console.log(form.formState.defaultValues);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: UpdateProductOutput) => {
    console.log(form.formState.dirtyFields);
    const dirtyData = getItemsDirtyData(data, form.formState.dirtyFields);
    console.log(data, dirtyData);
    startTransition(async () => {
      // const { success, message } = await updateArticle(product.id, dirtyData);
      // if (!success) toast.error(message);
      // else {
      //   toast.success(message);
      // }
    });
  };

  return {
    isPending,
    submit: form.handleSubmit(onSubmit),
    form,
  };
};
