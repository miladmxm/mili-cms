/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import type { PropsWithChildren } from "react";

import { createContext, use, useMemo, useState } from "react";

import { openAuthDialog } from "@/features/auth/customer/store/auth";
import { useSession } from "@/hooks/useSession";

const AddCommentContext = createContext<
  | {
      isOpen: boolean;
      toggleIsOpen: () => void;
      productId: string;
      commentType: "comment" | "qa";
      setParentId: (id: string | null) => void;
      setType: (type: "comment" | "qa") => void;
    }
  | undefined
>(undefined);
AddCommentContext.displayName = "AddCommentContext";

const AddCommentContextProvider = ({
  children,
  productId,
}: PropsWithChildren<{ productId: string }>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [parentId, setParentIdState] = useState<string | null>(null);
  const [commentType, setCommentType] = useState<"comment" | "qa">("comment");
  const { data } = useSession();
  const isSigned = !!data?.session?.id;

  const toggleIsOpen = () => {
    if (!isSigned) {
      openAuthDialog();
    }

    setIsOpen((prev) => !prev);
  };

  const setParentId = (id: string | null) => {
    setParentIdState(id);
  };

  const setType = (type: "comment" | "qa") => {
    setCommentType(type);
  };

  const value = useMemo(
    () => ({
      isOpen: isOpen && isSigned,
      toggleIsOpen,
      productId,
      setParentId,
      parentId,
      commentType,
      setType,
    }),
    [isOpen, isSigned, productId, parentId, commentType],
  );
  return <AddCommentContext value={value}>{children}</AddCommentContext>;
};

export default AddCommentContextProvider;

export const useAddCommentContext = () => {
  const addCommentCtx = use(AddCommentContext);
  if (!addCommentCtx) throw new Error("Add comment context not provided");
  return addCommentCtx;
};
