import "server-only";

import type { UpdateCommentPayload } from "@/services/comment/type";

import { dalDbOperation, dalRequireAuth } from "@/dal/helpers";
import * as commentService from "@/services/comment";

export const updateComment = async (id: string, data: UpdateCommentPayload) => {
  return dalRequireAuth(
    () => dalDbOperation(() => commentService.updateComment(id, data)),
    { comment: ["update"] },
  );
};

export const deleteComment = async (id: string) => {
  return dalRequireAuth(
    () => dalDbOperation(() => commentService.deleteComment(id)),
    { comment: ["delete"] },
  );
};
