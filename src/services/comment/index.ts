import * as commentsRepo from "@/repositories/comment.repo";

import type { LimitAndOffset } from "../type";
import type { UpdateCommentPayload } from "./type";

import { DTOtoAdminAccessComment } from "./dto";

// * READ
export const getAllComments = async (options?: LimitAndOffset) => {
  const comments = await commentsRepo.findAllCommentsWithRelations(options);
  return DTOtoAdminAccessComment(comments);
};

// * CREATE

// * UPDATE
export const updateComment = async (id: string, data: UpdateCommentPayload) => {
  return commentsRepo.updateComment({ data, id });
};
// * DELETE
