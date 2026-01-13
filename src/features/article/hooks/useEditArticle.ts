import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { Article } from "@/services/article/types";

import type { CreateArticleOutput } from "../validations/createSchema";

import { createArticleAction } from "../actions/create";
import { useCreateArticleStore } from "../store";
import { CreateArticleSchema } from "../validations/createSchema";

export const useEditArticle = (article: Article) => {
  const { content, excerpt, title, slug, thumbnail, status, categoryIds } =
    article;
  const router = useRouter();
  const setPreviewImageUrl = useCreateArticleStore(
    (store) => store.setPreviewImageUrl,
  );
  const setDefalutContentValue = useCreateArticleStore(
    (store) => store.setDefaultContentValue,
  );

  const { getValues, setValue, handleSubmit, control, reset } =
    useForm<CreateArticleOutput>({
      resolver: valibotResolver(CreateArticleSchema),
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
  const handleSetDefaultContent = useEffectEvent(() => {
    setDefalutContentValue(content);
  });
  useEffect(() => {
    handleSetDefaultImage();
    handleSetDefaultContent();
  }, []);
  const onSubmit = (data: CreateArticleOutput) => {
    startTransition(async () => {
      const { success, message } = await createArticleAction(data);
      if (!success) toast.error(message);
      else {
        reset();
        setDefalutContentValue(`<p dir="rtl"></p>`);
        setPreviewImageUrl("");
        router.replace("/admin/blog");
      }
    });
  };

  return {
    isPending,
    control,
    submit: handleSubmit(onSubmit),
    setValue,
    getValues,
  };
};
