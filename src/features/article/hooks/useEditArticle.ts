import { valibotResolver } from "@hookform/resolvers/valibot";
import { useEffect, useEffectEvent, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { Article } from "@/services/article/types";

import type { UpdateArticle } from "../validations/updateSchema";

import { updateArticle } from "../actions/update";
import { useCreateArticleStore } from "../store";
import { UpdateArticleSchema } from "../validations/updateSchema";

export const useEditArticle = (article: Article) => {
  const { content, excerpt, title, slug, thumbnail, status, categoryIds } =
    article;
  const setPreviewImageUrl = useCreateArticleStore(
    (store) => store.setPreviewImageUrl,
  );

  const form = useForm<UpdateArticle>({
    resolver: valibotResolver(UpdateArticleSchema),
    defaultValues: {
      content,
      excerpt,
      title,
      slug,
      thumbnail: thumbnail?.id ?? undefined,
      status,
      categoryIds,
    },
  });
  const [isPending, startTransition] = useTransition();

  const handleSetDefaultImage = useEffectEvent(() =>
    setPreviewImageUrl(thumbnail?.url || ""),
  );

  useEffect(() => {
    handleSetDefaultImage();
  }, []);
  const onSubmit = (data: UpdateArticle) => {
    startTransition(async () => {
      const { success, message } = await updateArticle(article.id, data);
      if (!success) toast.error(message);
      else {
        form.reset();
        setPreviewImageUrl("");
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
