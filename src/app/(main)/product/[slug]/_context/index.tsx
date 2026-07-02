"use client";

import type { PropsWithChildren } from "react";

import { createContext, use, useMemo } from "react";

import type { Comment } from "@/services/comment/type";
import type { Product } from "@/services/product/type";

type QACommentWithReplies = Comment & {
  replies: Comment[];
};

interface ProductPageState {
  product: Product;
  comments: Promise<Comment[]>;
  qaComments: Promise<QACommentWithReplies[]>;
}

const ProductPageContext = createContext<ProductPageState | undefined>(
  undefined,
);
ProductPageContext.displayName = "ProductPageContext";

const ProductPageContextProvider = ({
  comments,
  qaComments,
  product,
  children,
}: PropsWithChildren<ProductPageState>) => {
  const value = useMemo<ProductPageState>(
    () => ({ comments, qaComments, product }),
    [comments, qaComments, product],
  );
  return <ProductPageContext value={value}>{children}</ProductPageContext>;
};

export default ProductPageContextProvider;

export const useProductPageContext = () => {
  const ctx = use(ProductPageContext);
  if (!ctx) throw new Error("context not provided");
  return ctx;
};
