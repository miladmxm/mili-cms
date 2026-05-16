import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { CreatePortfolioInput } from "../validations/schema";

import { createPortfolioAction } from "../actions/create";
import { CreatePortfolioSchema } from "../validations/schema";

export const useCreatePortfolio = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    resolver: valibotResolver(CreatePortfolioSchema),
    defaultValues: {
      title: "",
      link: "",
      description: "",
    },
  });

  const onSubmit = (data: CreatePortfolioInput) => {
    startTransition(async () => {
      const { success, message } = await createPortfolioAction(data);

      if (!success) toast.error(message);
      else {
        form.reset();
        router.replace("/admin/portfolio");
      }
    });
  };

  return { form, isPending, submit: form.handleSubmit(onSubmit) };
};
