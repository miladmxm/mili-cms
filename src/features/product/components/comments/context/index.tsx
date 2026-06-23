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
    }
  | undefined
>(undefined);
AddCommentContext.displayName = "AddCommentContext";

const AddCommentContextProvider = ({
  children,
  productId,
}: PropsWithChildren<{ productId: string }>) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSession();
  const isSigned = !!data?.session?.id;

  const toggleIsOpen = () => {
    if (!isSigned) {
      openAuthDialog();
    }

    setIsOpen((prev) => !prev);
  };

  const value = useMemo(
    () => ({ isOpen: isOpen && isSigned, toggleIsOpen, productId }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOpen, isSigned, openAuthDialog, toggleIsOpen, productId],
  );
  return <AddCommentContext value={value}>{children}</AddCommentContext>;
};

export default AddCommentContextProvider;

export const useAddCommentContext = () => {
  const addCommentCtx = use(AddCommentContext);
  if (!addCommentCtx) throw new Error("Add comment context not provided");
  return addCommentCtx;
};
