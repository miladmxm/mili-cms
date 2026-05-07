import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { Category } from "@/services/article/types";

import { getItemsDirtyData } from "@/utils/dirtyValues";

import type { UpdateCategoryOutput } from "../validations/category.schema";

import { updateCategory } from "../actions/update";
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
  const router = useRouter();

  const handleSubmit = (data: UpdateCategoryOutput) => {
    startTransition(async () => {
      const dirtyData = getItemsDirtyData(data, form.formState.dirtyFields);
      const { success, message } = await updateCategory(id, dirtyData);

      if (!success) toast.error(message);
      else {
        toast.success(message);
        router.replace("/admin/blog/categories");
      }
    });
  };

  return {
    isPending,
    submit: form.handleSubmit(handleSubmit),
    form,
  };
};
