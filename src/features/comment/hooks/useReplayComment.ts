import { valibotResolver } from "@hookform/resolvers/valibot";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { CommentAdminAccess } from "@/services/comment/type";

import type { ReplayCommentOutput } from "../validations";

import { replayCommentAction } from "../actions/create";
import { useCommentStore } from "../store";
import { ReplayCommentSchema } from "../validations";

export const useReplayComment = (comment?: CommentAdminAccess) => {
  const [isPending, startTransition] = useTransition();
  const setActiveCommentId = useCommentStore(
    (store) => store.setActiveCommentId,
  );
  const { control, handleSubmit, reset } = useForm({
    resolver: valibotResolver(ReplayCommentSchema),
    defaultValues: { content: "", parentId: comment?.id || "" },
  });

  const onSubmit = ({ content }: ReplayCommentOutput) => {
    if (!comment || isPending) return;
    startTransition(async () => {
      const { success, message } = await replayCommentAction({
        content,
        parentId: comment.id,
      });

      if (!success) {
        toast.error(message);
      } else {
        toast.success(message);
        reset();
        setActiveCommentId(undefined);
      }
    });
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    isPending,
  };
};
