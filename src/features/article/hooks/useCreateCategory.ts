import { valibotResolver } from "@hookform/resolvers/valibot";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { CreateCategoryOutput } from "../validations/createCategory";

import { createCategoryAction } from "../actions/create";
import { CreateCategorySchema } from "../validations/createCategory";

export const useCreateCategory = () => {
  const form = useForm({
    resolver: valibotResolver(CreateCategorySchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (data: CreateCategoryOutput) => {
    startTransition(async () => {
      const { success, message } = await createCategoryAction(data);
      if (!success) toast.error(message);
      else {
        toast.success(message);
        form.reset({ description: "" });
      }
    });
  };

  return {
    isPending,
    submit: form.handleSubmit(handleSubmit),
    form,
  };
};
