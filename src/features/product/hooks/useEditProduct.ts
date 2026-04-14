import { valibotResolver } from "@hookform/resolvers/valibot";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import type { Product } from "@/services/product/type";

import type { CreateProductOutput } from "../validations/product.schema";

import { CreateProductSchema } from "../validations/product.schema";

export const useEditProduct = (product: Product) => {
  const {
    content,
    excerpt,
    name,
    slug,
    thumbnail,
    status,
    categoryIds,
    type,
    productMeta,
    gallery,
  } = product;

  const form = useForm({
    resolver: valibotResolver(CreateProductSchema),
    defaultValues: {
      content,
      excerpt,
      name,
      slug,
      status,
      categoryIds,
      // metadata: [],
      // type,
      gallery,
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: CreateProductOutput) => {
    console.log(data);
    // const dirtyData = getItemsDirtyData(data, form.formState.dirtyFields);
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
