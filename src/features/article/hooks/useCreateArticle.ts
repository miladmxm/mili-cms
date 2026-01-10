import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { CreateArticleOutput } from "../validations/createSchema";

import { createArticleAction } from "../actions/create";
import { useCreateArticleStore } from "../store";
import { CreateArticleSchema } from "../validations/createSchema";

export const useCreateArticle = () => {
  const router = useRouter();
  const setPreviewImageUrl = useCreateArticleStore(
    (store) => store.setPreviewImageUrl,
  );
  const setDefalutContentValue = useCreateArticleStore(
    (store) => store.setDefaultContentValue,
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("object");
      setDefalutContentValue("miladmxm ");
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
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
