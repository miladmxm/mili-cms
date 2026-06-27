"use client";

import type { PropsWithChildren } from "react";

import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";

import CommentForm from "./commentForm";
import AddCommentContextProvider, { useAddCommentContext } from "./context";
import QaForm from "./qaForm";

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
  content,
  children,
  className,
  ui = "pure",
}: PropsWithChildren<{
  parentId?: string;
  className?: string;
  content?: string;
  ui?: "designed" | "pure";
}>) => {
  const { toggleIsOpen, setType, setParentId, setContent } =
    useAddCommentContext();

  const handleClick = () => {
    setType("qa");
    setParentId(parentId);
    setContent(content);
    toggleIsOpen();
  };

  if (ui === "designed") {
    return (
      <Button
        onClick={handleClick}
        variant="secondary"
        className="max-w-xl mx-auto"
      >
        {children}
      </Button>
    );
  }

  return (
    <button onClick={handleClick} type="button" className={className}>
      {children}
    </button>
  );
};

const AddCommentDialog = ({ productId }: { productId: string }) => {
  const { isOpen, toggleIsOpen, commentType, parentId, content } =
    useAddCommentContext();
  const isQA = commentType === "qa";
  return (
    <Dialog
      isOpen={isOpen}
      onClose={toggleIsOpen}
      title={isQA ? "پرسش خود را بنویسید" : "نظر خود را وارد کنید"}
    >
      {isQA ? (
        <>
          {content && parentId && (
            <p className="text-sm text-thready-900 text-justify px-3 py-1">
              <strong>پاسخ به: </strong>
              {content}
            </p>
          )}
          <QaForm productId={productId} parentId={parentId} />
        </>
      ) : (
        <CommentForm productId={productId} />
      )}
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
