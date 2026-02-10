import { valibotResolver } from "@hookform/resolvers/valibot";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import type { Category } from "@/services/article/types";

import type { UpdateCategoryOutput } from "../validations/category.schema";

import { UpdateCategorySchema } from "../validations/category.schema";

export const useEditCategory = ({
  name,
  id,
  slug,
  description,
  parentId,
  thumbnail,
}: Category) => {
  const form = useForm({
    resolver: valibotResolver(UpdateCategorySchema),
    defaultValues: {
      name,
      slug,
      description: description || undefined,
      parentId: parentId || undefined,
      thumbnail: thumbnail
        ? { id: thumbnail.id, url: thumbnail.url }
        : undefined,
    },
  });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (data: UpdateCategoryOutput) => {
    startTransition(async () => {
      console.log(data);
      console.log(id);
      // const { success, message } = await createCategoryAction(data);
      // if (!success) toast.error(message);
      // else {
      //   toast.success(message);
      //   form.reset({ description: "" });
      // }
    });
  };

  return {
    isPending,
    submit: form.handleSubmit(handleSubmit),
    form,
  };
};
