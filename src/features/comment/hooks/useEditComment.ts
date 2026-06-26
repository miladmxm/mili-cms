import { valibotResolver } from "@hookform/resolvers/valibot";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { CommentAdminAccess } from "@/services/comment/type";

import type { UpdateCommentOutput } from "../validations";

import { updateComment } from "../actions/update";
import { UpdateCommentSchema } from "../validations";

export const useEditComment = (comment?: CommentAdminAccess) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: valibotResolver(UpdateCommentSchema),
    defaultValues: {
      ...comment,
    },
  });

  const onSubmit = (data: UpdateCommentOutput) => {
    if (isPending || !comment) return;
    startTransition(async () => {
      const { success, message } = await updateComment(comment.id, data);

      if (!success) {
        toast.error(message);
      } else {
        toast.success(message);
      }
    });
  };

  return { form, handleSubmit: form.handleSubmit(onSubmit), isPending };
};
