"use client";

import type { SerializedEditorState } from "lexical";

import { useState } from "react";

import Editor from "@/components/dashboard/blocks/editor-x/editor";

export const initialValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
} as unknown as SerializedEditorState;

export default function RichEditor({ className }: { className?: string }) {
  const [editorState, setEditorState] =
    useState<SerializedEditorState>(initialValue);
  return (
    <Editor
      className={className}
      editorSerializedState={editorState}
      onSerializedChange={(value) => setEditorState(value)}
    />
  );
}
