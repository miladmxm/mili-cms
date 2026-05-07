import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { CreateOptionInput } from "../validations/option.schema";

import { createOptionAction } from "../actions/create";
import { CreateOptionSchema } from "../validations/option.schema";

export const useAddOption = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    resolver: valibotResolver(CreateOptionSchema),
    defaultValues: {
      slug: "",
      name: "",
      items: [],
    },
  });

  const submit = (data: CreateOptionInput) => {
    startTransition(async () => {
      const { success, message } = await createOptionAction(data);

      if (!success) toast.error(message);
      else {
        form.reset();
        router.replace("/admin/products/options");
      }
    });
  };

  return { form, onSubmit: form.handleSubmit(submit), isPending };
};
