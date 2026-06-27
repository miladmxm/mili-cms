"use client";

import AddComment, {
  OpenQACommentDialog,
} from "@/features/product/components/comments/addComment";

import { useProductPageContext } from "../context";
import QAList from "./qaList";

const ProductQA = () => {
  const { product } = useProductPageContext();
  return (
    <div className="flex flex-col gap-8">
      <AddComment productId={product.id}>
        <QAList />
        <OpenQACommentDialog ui="designed">
          سوال خود را مطرح کنید
        </OpenQACommentDialog>
      </AddComment>
    </div>
  );
};

export default ProductQA;
