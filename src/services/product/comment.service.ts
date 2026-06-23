import { cacheTag } from "next/cache";

import { CacheKeys } from "@/constant/cacheKeys";
import { withTransaction } from "@/repositories";
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

  cacheTag(`${CacheKeys.productComment}-${productId}`);
  return productRepo.findProductCommentsApproved({
    productId,
    options: limitAndOffset,
    userId,
  });
};

// * CREATE
export const createDefaultComment = async ({
  authorId,
  content,
  productId,
}: CreateProductComment) => {
  console.log("creatcomment", authorId, content, productId);
  const resultId = await withTransaction(async (tx) => {
    const [{ id: commentId }] = await productRepo.createComment(
      {
        authorId,
        content,
        status: "pending",
        type: "default",
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
