import { valibotResolver } from "@hookform/resolvers/valibot";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import type { CreateCategoryOutput } from "../validations/createCategory";

import { CreateCategorySchema } from "../validations/createCategory";

export const useCreateCategory = () => {
  const form = useForm<CreateCategoryOutput>({
    resolver: valibotResolver(CreateCategorySchema),
    defaultValues: {
      description: "",
      name: "",
      parentId: "",
      slug: "",
      thumbnail: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (data: CreateCategoryOutput) => {
    startTransition(async () => {
      console.log(data);
      // const { success, message } = await createArticleAction(data);
      // if (!success) toast.error(message);
      // else {
      //   form.reset();
      //   setdefaultContentValue(`<p dir="rtl">helo</p>`);
      //   router.replace("/admin/blog");
      // }
    });
  };

  return {
    isPending,
    control: form.control,
    submit: form.handleSubmit(handleSubmit),
    getValue: form.getValues,
    setValue: form.setValue,
  };
};
