import { valibotResolver } from "@hookform/resolvers/valibot";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { Portfolio } from "@/services/portfolio/type";

import type { CreatePortfolioInput } from "../validations/schema";

import { updatePortfolioAction } from "../actions/update";
import { CreatePortfolioSchema } from "../validations/schema";

export const useEditPortfolio = ({
  description,
  id,
  link,
  thumbnail,
  title,
}: Portfolio) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: valibotResolver(CreatePortfolioSchema),
    defaultValues: {
      title,
      link,
      description,
      thumbnail: { id: thumbnail.id, url: thumbnail.url },
    },
  });

  const onSubmit = (data: CreatePortfolioInput) => {
    startTransition(async () => {
      const { success, message } = await updatePortfolioAction(id, data);

      if (!success) toast.error(message);
      else {
        toast.success(message);
      }
    });
  };

  return { form, isPending, submit: form.handleSubmit(onSubmit) };
};
