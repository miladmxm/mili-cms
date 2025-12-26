"use client";

import type { SerializedEditorState } from "lexical";

import dynamic from "next/dynamic";
import { useState } from "react";

import { Skeleton } from "@/components/dashboard/ui/skeleton";

export const RichEditorSkeleton = () => {
  return (
    <div className="flex flex-col gap-1 border p-2 rounded-xl">
      <div className="w-full overflow-scroll">
        <div className="flex gap-3 h-7 w-max">
          <Skeleton className="size-6" />
          <Skeleton className="size-6" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="size-6" />
          <Skeleton className="size-6" />
          <Skeleton className="h-6 w-12" />
          <Skeleton className="size-6" />
          <Skeleton className="size-6" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="size-6" />
          <Skeleton className="size-6" />
        </div>
      </div>
      <Skeleton className="w-full h-full min-h-86"></Skeleton>
      <div className="flex gap-3 h-7 justify-end">
        <Skeleton className="size-6" />
        <Skeleton className="size-6" />
        <Skeleton className="size-6" />
        <Skeleton className="size-6" />
        <Skeleton className="size-6" />
        <Skeleton className="size-6" />
        <Skeleton className="size-6" />
        <Skeleton className="size-6" />
      </div>
    </div>
  );
};
const Editor = dynamic(
  () => import("@/components/dashboard/blocks/editor-x/editor"),
  { ssr: false, loading: RichEditorSkeleton },
);
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
        direction: "rtl",
        format: "right",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "rtl",
    format: "right",
    indent: 0,
    type: "root",
    version: 1,
  },
} as unknown as SerializedEditorState;

export default function RichEditor({
  className,
  defaultValue,
  onChange,
}: {
  className?: string;
  defaultValue?: SerializedEditorState;
  onChange: (value: string) => void;
}) {
  const [editorState, setEditorState] = useState<
    SerializedEditorState | undefined
  >(defaultValue || initialValue);
  return (
    <Editor
      className={className}
      editorSerializedState={editorState}
      onHtmlChange={onChange}
      onSerializedChange={(value) => setEditorState(value)}
    />
  );
}
