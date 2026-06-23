import { valibotResolver } from "@hookform/resolvers/valibot";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { ProductCommentContentOutput } from "../validations/comment.schema";

import { createProductComment } from "../actions/create";
import { useAddCommentContext } from "../components/comments/context";
import { ProductCommentContentSchema } from "../validations/comment.schema";

export const useAddComment = (productId: string) => {
  const [isPending, startTransition] = useTransition();
  const { toggleIsOpen } = useAddCommentContext();
  const router = useRouter();
  const form = useForm({
    resolver: valibotResolver(ProductCommentContentSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (data: ProductCommentContentOutput) => {
    startTransition(async () => {
      const { success, message } = await createProductComment(productId, data);

      if (!success) toast.error(message);
      else {
        form.reset();
        toggleIsOpen();
        router.refresh();
      }
    });
  };

  return {
    handleSubmit: form.handleSubmit(onSubmit),
    control: form.control,
    isPending,
  };
};
