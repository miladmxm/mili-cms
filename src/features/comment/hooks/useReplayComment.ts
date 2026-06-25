import { valibotResolver } from "@hookform/resolvers/valibot";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import type { CommentAdminAccess } from "@/services/comment/type";

import { ReplayCommentValidation } from "../validations";

export const useReplayComment = (comment?: CommentAdminAccess) => {
  const [isPending, startTransition] = useTransition();
  const { control, handleSubmit, reset } = useForm({
    resolver: valibotResolver(ReplayCommentValidation),
    defaultValues: { content: "" },
  });

  const onSubmit = (data: any) => {
    console.log(comment);
    console.log(data);
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    isPending,
  };
};
