import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { CreateArticleOutput } from "../validations/article.schema";

import { createArticleAction } from "../actions/create";
import { CreateArticleSchema } from "../validations/article.schema";

export const useCreateArticle = () => {
  const router = useRouter();

  const form = useForm({
    resolver: valibotResolver(CreateArticleSchema),
    defaultValues: {
      content: {},
      excerpt: "",
      title: "",
      slug: "",
      thumbnail: undefined,
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
        form.reset();
        router.replace("/admin/blog");
      }
    });
  };

  return {
    isPending,
    submit: form.handleSubmit(onSubmit),
    form,
  };
};
