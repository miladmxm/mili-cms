"use client";

import AddComment, {
  OpenCommentDialog,
} from "@/features/product/components/comments/addComment";

import { useProductPageContext } from "../_context";
import CommentsList from "./commentsList";

const ProductComments = () => {
  const { product } = useProductPageContext();
  return (
    <div className="flex flex-col gap-8">
      <CommentsList />
      <AddComment productId={product.id}>
        <OpenCommentDialog />
      </AddComment>
    </div>
  );
};

export default ProductComments;
