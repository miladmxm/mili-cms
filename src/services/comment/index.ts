import { ThrowableDalError } from "@/dal/types";
import { withTransaction } from "@/repositories";
import { createArticleToComment } from "@/repositories/article.repo";
import * as commentsRepo from "@/repositories/comment.repo";
import { createProductToComment } from "@/repositories/product.repo";

import type { LimitAndOffset } from "../type";
import type { CreateReplayComment, UpdateCommentPayload } from "./type";

import { DTOtoAdminAccessComment } from "./dto";

// * READ
export const getAllComments = async (options?: LimitAndOffset) => {
  const comments = await commentsRepo.findAllCommentsWithRelations(options);
  return DTOtoAdminAccessComment(comments);
};

// * CREATE
export const createReplayComment = async ({
  authorId,
  content,
  parentId,
  role,
}: CreateReplayComment) => {
  const parentComment =
    await commentsRepo.findCommentByIdWithRelations(parentId);
  if (!parentComment) throw new ThrowableDalError({ type: "not-found" });
  if (parentComment.type !== "qa")
    throw new ThrowableDalError({ type: "no-access" });
  const relation = parentComment.product
    ? { id: parentComment.product.productId, posttype: "product" }
    : { id: parentComment.article.articleId, posttype: "article" };

  return withTransaction(async (tx) => {
    const [{ id }] = await commentsRepo.createComment(
      {
        authorId,
        content,
        parentId,
        type: "qa",
        status: role === "admin" ? "approved" : "pending",
      },
      tx,
    );

    if (relation.posttype === "product") {
      await createProductToComment(
        {
          commentId: id,
          productId: relation.id,
        },
        tx,
      );
    } else if (relation.posttype === "article") {
      await createArticleToComment(
        {
          articleId: relation.id,
          commentId: id,
        },
        tx,
      );
    }

    return id;
  });
};

// * UPDATE
export const updateComment = async (id: string, data: UpdateCommentPayload) => {
  return commentsRepo.updateComment({ data, id });
};

// * DELETE
export const deleteComment = async (id: string) => {
  return commentsRepo.deleteCommentById(id);
};
