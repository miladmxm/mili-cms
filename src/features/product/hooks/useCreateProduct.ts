import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { CreateProductOutput } from "../validations/product.schema";

import { createArticleAction } from "../actions/create";
import { CreateProductSchema } from "../validations/product.schema";

export const useCreateProduct = () => {
  const router = useRouter();

  const form = useForm({
    resolver: valibotResolver(CreateProductSchema),
    defaultValues: {
      content: {},
      excerpt: "",
      name: "",
      slug: "",
      thumbnail: undefined,
      status: "draft",
      categoryIds: [],
    },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: CreateProductOutput) => {
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
