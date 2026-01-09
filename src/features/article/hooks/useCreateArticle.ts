import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { CreateArticleOutput } from "../validations/createSchema";

import { createArticleAction } from "../actions/create";
import { CreateArticleSchema } from "../validations/createSchema";

export const useCreateArticle = () => {
  const router = useRouter();
  const [previewImageUrl, setPreviewImageUrl] = useState("");

  const [defaultContentValue, setdefaultContentValue] = useState(
    `<div dir="rtl" style="text-align: right;"><p dir="rtl"></p></div>`,
  );
  const { getValues, setValue, handleSubmit, control, reset } =
    useForm<CreateArticleOutput>({
      resolver: valibotResolver(CreateArticleSchema),
      defaultValues: {
        content: "",
        excerpt: "",
        title: "",
        slug: "",
        thumbnail: "",
        status: "draft",
        categoryIds: [],
      },
    });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: CreateArticleOutput) => {
    startTransition(async () => {
      const { success, message } = await createArticleAction(data);
      if (!success) toast.error(message);
      else {
        reset();
        setdefaultContentValue(`<p dir="rtl">helo</p>`);
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
    defaultContentValue,
    mediaPicker: {
      previewImageUrl,
      setPreviewImageUrl,
    },
  };
};
