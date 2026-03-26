import { valibotResolver } from "@hookform/resolvers/valibot";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { Article } from "@/services/article/types";

import { getItemsDirtyData } from "@/utils/dirtyValues";

import type { UpdateArticle } from "../validations/product.schema";

import { updateArticle } from "../actions/update";
import { UpdateArticleSchema } from "../validations/product.schema";

export const useEditArticle = (article: Article) => {
  const { content, excerpt, title, slug, thumbnail, status, categoryIds } =
    article;

  const form = useForm({
    resolver: valibotResolver(UpdateArticleSchema),
    defaultValues: {
      content,
      excerpt,
      title,
      slug,
      thumbnail: thumbnail
        ? { id: thumbnail.id, url: thumbnail.url }
        : undefined,
      status,
      categoryIds,
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: UpdateArticle) => {
    const dirtyData = getItemsDirtyData(data, form.formState.dirtyFields);
    startTransition(async () => {
      const { success, message } = await updateArticle(article.id, dirtyData);
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
