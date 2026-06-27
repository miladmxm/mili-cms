/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import type { PropsWithChildren } from "react";

import { createContext, use, useMemo, useState } from "react";

import { openAuthDialog } from "@/features/auth/customer/store/auth";
import { useSession } from "@/hooks/useSession";

interface AddCommentState {
  isOpen: boolean;
  toggleIsOpen: () => void;
  productId: string;
  commentType: "comment" | "qa";
  content?: string;
  setContent: (content?: string) => void;
  parentId?: string;
  setParentId: (id?: string) => void;
  setType: (type: "comment" | "qa") => void;
}

const AddCommentContext = createContext<AddCommentState | undefined>(undefined);
AddCommentContext.displayName = "AddCommentContext";

const AddCommentContextProvider = ({
  children,
  productId,
}: PropsWithChildren<{ productId: string }>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [parentId, setParentIdState] = useState<string | undefined>(undefined);
  const [commentType, setCommentType] = useState<"comment" | "qa">("comment");
  const { data } = useSession();
  const isSigned = !!data?.session?.id;
  const [content, setContent] = useState<string | undefined>(undefined);

  const toggleIsOpen = () => {
    if (!isSigned) {
      openAuthDialog();
    }

    setIsOpen((prev) => !prev);
  };

  const setParentId = (id?: string) => {
    setParentIdState(id);
  };

  const setType = (type: "comment" | "qa") => {
    setCommentType(type);
  };

  const value = useMemo<AddCommentState>(
    () => ({
      isOpen: isOpen && isSigned,
      toggleIsOpen,
      productId,
      setParentId,
      parentId,
      commentType,
      setType,
      setContent,
      content,
    }),
    [isOpen, isSigned, productId, parentId, commentType, content],
  );
  return <AddCommentContext value={value}>{children}</AddCommentContext>;
};

export default AddCommentContextProvider;

export const useAddCommentContext = () => {
  const addCommentCtx = use(AddCommentContext);
  if (!addCommentCtx) throw new Error("Add comment context not provided");
  return addCommentCtx;
};
