import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";

import type { CreateOptionInput } from "../validations/option.schema";

import { CreateOptionSchema } from "../validations/option.schema";

export const useAddOption = () => {
  const form = useForm({
    resolver: valibotResolver(CreateOptionSchema),
    defaultValues: {
      slug: "",
      name: "",
      items: [],
    },
  });

  const submit = (data: CreateOptionInput) => {
    console.log("object", data);
  };
  return { form, onSubmit: form.handleSubmit(submit), isPending: false };
};
