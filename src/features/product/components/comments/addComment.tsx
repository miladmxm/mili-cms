"use client";

import type { PropsWithChildren } from "react";

import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";

import CommentForm from "./commentForm";
import AddCommentContextProvider, { useAddCommentContext } from "./context";

export const OpenCommentDialog = () => {
  const { toggleIsOpen } = useAddCommentContext();
  return (
    <Button
      onClick={toggleIsOpen}
      variant="secondary"
      className="max-w-xl mx-auto"
    >
      نظرتان را ثبت کنید
    </Button>
  );
};

export const OpenQACommentDialog = ({
  parentId,
  children,
}: PropsWithChildren<{ parentId: string }>) => {
  const { toggleIsOpen, setType, setParentId } = useAddCommentContext();

  const handleClick = () => {
    setType("qa");
    setParentId(parentId);
    toggleIsOpen();
  };

  return (
    <button onClick={handleClick} type="button" className="max-w-xl mx-auto">
      {children}
    </button>
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
