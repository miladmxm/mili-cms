import { cacheTag } from "next/cache";

import { CacheKeys } from "@/constant/cacheKeys";
import { withTransaction } from "@/repositories";
import * as commentRepo from "@/repositories/comment.repo";
import * as productRepo from "@/repositories/product.repo";

import type { LimitAndOffset } from "../type";
import type { CreateProductComment } from "./type";

// * READ
export const getApprovedProductComments = async (
  {
    productId,
    userId,
  }: {
    productId: string;
    userId?: string;
  },
  limitAndOffset?: LimitAndOffset,
) => {
  "use cache";

  cacheTag(
    CacheKeys.comment,
    CacheKeys.productComment,
    `${CacheKeys.productComment}-${productId}`,
  );
  return productRepo.findProductCommentsApproved({
    productId,
    options: limitAndOffset,
    userId,
  });
};

export const getApprovedProductQAwithReply = async (
  {
    productId,
    userId,
  }: {
    productId: string;
    userId?: string;
  },
  limitAndOffset?: LimitAndOffset,
) => {
  "use cache";

  cacheTag(
    CacheKeys.comment,
    CacheKeys.productComment,
    `${CacheKeys.productComment}-${productId}`,
  );
  return productRepo.findProductQACommentsWithReplies({
    productId,
    options: limitAndOffset,
    userId,
  });
};

// * CREATE
export const createDefaultComment = async ({
  authorId,
  content,
  rate,
  productId,
  isQA,
  parentId,
}: CreateProductComment) => {
  const resultId = await withTransaction(async (tx) => {
    const [{ id: commentId }] = await commentRepo.createComment(
      {
        authorId,
        content,
        rate,
        status: "pending",
        type: isQA ? "qa" : "default",
        parentId: parentId && isQA ? parentId : null,
      },
      tx,
    );
    const [{ id }] = await productRepo.createProductToComment(
      {
        commentId,
        productId,
      },
      tx,
    );
    return id;
  });
  return resultId;
};
