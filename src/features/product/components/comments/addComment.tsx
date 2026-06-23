"use client";

import type { PropsWithChildren } from "react";

import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";

import CommentForm from "./commentForm";
import AddCommentContextProvider, { useAddCommentContext } from "./context";

export const OpenCommentDialog = () => {
  const { toggleIsOpen } = useAddCommentContext();
  return (
    <Button onClick={toggleIsOpen} variant="secondary">
      نظرتان را ثبت کنید
    </Button>
  );
};

const AddCommentDialog = ({ productId }: { productId: string }) => {
  const { isOpen, toggleIsOpen } = useAddCommentContext();
  return (
    <Dialog isOpen={isOpen} onClose={toggleIsOpen} title="نظر خود را وارد کنید">
      <CommentForm productId={productId} />
    </Dialog>
  );
};

const AddComment = ({
  productId,
  children,
}: PropsWithChildren<{ productId: string }>) => {
  return (
    <AddCommentContextProvider productId={productId}>
      {children}
      <AddCommentDialog productId={productId} />
    </AddCommentContextProvider>
  );
};

export default AddComment;
