import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { CreateArticleOutput } from "../validations/createSchema";

import { createArticleAction } from "../actions/create";
import { CreateArticleSchema } from "../validations/createSchema";

export const useHandleImagePicker = () => {
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  return {
    showMediaPicker,
    previewImageUrl,
    setPreviewImageUrl,
    setShowMediaPicker,
  };
};
export const useCreateArticle = () => {
  const router = useRouter();
  const [defaultContentValue, setdefaultContentValue] = useState(
    `<div dir="rtl" style="text-align: right;"><p dir="rtl"></p></div>`,
  );
  const form = useForm<CreateArticleOutput>({
    resolver: valibotResolver(CreateArticleSchema),
    defaultValues: {
      content: "",
      excerpt: "",
      title: "",
      slug: "",
      thumbnail: "",
      status: "draft",
    },
  });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (data: CreateArticleOutput) => {
    startTransition(async () => {
      const { success, message } = await createArticleAction(data);
      if (!success) toast.error(message);
      else {
        form.reset();
        setdefaultContentValue(`<p dir="rtl">helo</p>`);
        router.replace("/admin/blog");
      }
    });
  };

  return {
    isPending,
    control: form.control,
    submit: form.handleSubmit(handleSubmit),
    setValue: form.setValue,
    getValue: form.getValues,
    defaultContentValue,
  };
};
