import { withTransaction } from "@/repositories";
import * as productRepo from "@/repositories/product.repo";

import type { LimitAndOffset } from "../type";
import type { CreateProductComment } from "./type";

// * READ
export const getApprovedProductComments = (
  productId: string,
  limitAndOffset?: LimitAndOffset,
) => {
  return productRepo.findProductCommentsApproved({
    productId,
    options: limitAndOffset,
  });
};

// * CREATE
export const createDefaultComment = async ({
  authorId,
  content,
  productId,
}: CreateProductComment) => {
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
    const [{ id }] = await productRepo.createProductToComment({
      commentId,
      productId,
    });
    return id;
  });
  return resultId;
};
