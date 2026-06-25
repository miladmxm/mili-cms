import * as v from "valibot";

import type { CommentStatus, CommentType } from "@/services/comment/type";

export const UpdateCommentValidation = v.object({
  status: v.optional(
    v.picklist<CommentStatus[]>(["pending", "approved", "spam"]),
  ),
  type: v.optional(v.picklist<CommentType[]>(["default", "qa"])),
  content: v.optional(v.pipe(v.string(), v.nonEmpty("محتوا نباید خالی باشد"))),
});

export type UpdateCommentOutput = v.InferOutput<typeof UpdateCommentValidation>;

export const ReplayCommentValidation = v.object({
  content: v.pipe(v.string(), v.nonEmpty("محتوا نباید خالی باشد")),
});

export type ReplayCommentOutput = v.InferOutput<typeof ReplayCommentValidation>;
