"use client";

import type { LexicalEditor } from "lexical";
import type { JSX } from "react";

import { createContext, use } from "react";

const Context = createContext<{
  activeEditor: LexicalEditor;
  $updateToolbar: () => void;
  blockType: string;
  setBlockType: (blockType: string) => void;
  showModal: (
    title: string,
    showModal: (onClose: () => void) => JSX.Element,
  ) => void;
}>({
  activeEditor: {} as LexicalEditor,
  $updateToolbar: () => null,
  blockType: "paragraph",
  setBlockType: () => null,
  showModal: () => null,
});

Context.displayName = "Context";
export function ToolbarContext({
  activeEditor,
  $updateToolbar,
  blockType,
  setBlockType,
  showModal,
  children,
}: {
  activeEditor: LexicalEditor;
  $updateToolbar: () => void;
  blockType: string;
  setBlockType: (blockType: string) => void;
  showModal: (
    title: string,
    showModal: (onClose: () => void) => JSX.Element,
  ) => void;
  children: React.ReactNode;
}) {
  return (
    <Context
      // eslint-disable-next-line @eslint-react/no-unstable-context-value
      value={{
        activeEditor,
        $updateToolbar,
        blockType,
        setBlockType,
        showModal,
      }}
    >
      {children}
    </Context>
  );
}

export function useToolbarContext() {
  return use(Context);
}
