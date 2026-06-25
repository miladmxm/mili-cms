"use client";

import type { PropsWithChildren } from "react";
import type { StoreApi } from "zustand";

import { createContext, use, useEffect, useRef } from "react";
import { createStore, useStore } from "zustand";

import type { CommentAdminAccess } from "@/services/comment/type";

interface CommentAction {
  setActiveCommentId: (activeCommentId?: string) => void;
}

interface CommentStates {
  comments: CommentAdminAccess[];
  activeCommentId?: string;
}

type CommentStore = CommentAction & CommentStates;

const StoreContext = createContext<StoreApi<CommentStore> | null>(null);
StoreContext.displayName = "StoreContext";

const CommentStoreProvider = ({
  children,
  comments,
}: PropsWithChildren<CommentStates>) => {
  const storeRef = useRef<StoreApi<CommentStore>>(null);

  if (storeRef.current === null) {
    storeRef.current = createStore<CommentStore>((set) => ({
      comments,
      setActiveCommentId: (activeCommentId) => set({ activeCommentId }),
    }));
  }

  useEffect(() => {
    if (storeRef.current) {
      storeRef.current.setState({ comments });
    }
  }, [comments]);
  // eslint-disable-next-line react-hooks/refs
  return <StoreContext value={storeRef.current}>{children}</StoreContext>;
};

export default CommentStoreProvider;

export function useCommentStore<T>(selector: (state: CommentStore) => T): T {
  const store = use(StoreContext);
  if (!store) throw new Error("Missing Provider in the tree");
  return useStore(store, selector);
}
