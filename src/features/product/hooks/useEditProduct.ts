import { valibotResolver } from "@hookform/resolvers/valibot";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { getItemsDirtyData } from "@/utils/dirtyValues";

import type { CreateProductOutput } from "../validations/product.schema";

import { useEditProductContext } from "../context/editProduct";
import { CreateProductSchema } from "../validations/product.schema";

export const useEditProduct = () => {
  const { product } = useEditProductContext();
  const form = useForm({
    resolver: valibotResolver(CreateProductSchema),
    defaultValues: {
      ...product,
      metadata: [],
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: CreateProductOutput) => {
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
