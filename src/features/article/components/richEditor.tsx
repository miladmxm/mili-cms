"use client";

import dynamic from "next/dynamic";

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

export default function RichEditor({
  className,
  defaultValue,
  onChange,
}: {
  className?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
}) {
  return (
    <Editor
      className={className}
      defaultHtmlValue={defaultValue}
      onHtmlChange={onChange}
    />
  );
}
