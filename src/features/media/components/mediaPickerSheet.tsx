"use client";
import type { ComponentProps, RefObject } from "react";

import { useLinkStatus } from "next/link";
import { useRouter } from "next/navigation";
import { use, useImperativeHandle, useRef, useState } from "react";

import type { Media } from "@/services/media/type";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/dashboard/ui/sheet";
import { Spinner } from "@/components/dashboard/ui/spinner";
import { cn } from "@/lib/utils";

import EmptyMedias from "../containers/emptyMedias";
import { MinimalFileCard } from "./fileCard";
import MediaDropzone from "./mediaDropzone";
import DisplayUploadingFiles from "./uploadingFiles";

export interface SheetController {
  open: () => void;
  close: () => void;
}
const MediaPickerSheet = ({
  media,
  onSelect,
  selectedIds,
  controllerRef,
  ...props
}: ComponentProps<typeof MediaDropzone> & {
  media: Promise<Media[]>;
  selectedIds?: string[];
  onSelect: (data: { id: string; url: string; alt: string }) => void;
  controllerRef: RefObject<SheetController | null>;
}) => {
  const { pending } = useLinkStatus();
  const mediaData = use(media);
  const [open, setOpen] = useState(false);
  useImperativeHandle(
    controllerRef,
    () => ({
      close: () => {
        setOpen(false);
      },
      open: () => {
        setOpen(true);
      },
    }),
    [],
  );
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isBottom = () => {
    if (wrapperRef.current === null) return false;
    return (
      wrapperRef.current?.getBoundingClientRect().bottom <= window.innerHeight
    );
  };
  const handleScroll = () => {
    if (isBottom()) {
      router.push(`?mediaPageIndex=${mediaData.length + 20}`);
    }
  };
  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetContent className="max-h-[90svh]" side="bottom">
        <SheetHeader>
          <SheetTitle>با کلیک بر روی هر کدام انتخاب کنید</SheetTitle>
        </SheetHeader>

        <div
          className="overflow-y-auto h-full p-6 container gap-6 flex flex-col"
          onScrollEnd={handleScroll}
        >
          <MediaDropzone {...props} />
          <DisplayUploadingFiles />
          {pending && <Spinner className="size-10 mx-auto" />}
          {mediaData ? (
            <div
              className="h-max grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 pe-2 auto-rows-min"
              ref={wrapperRef}
            >
              {mediaData.map(({ id, meta, url, type }) => (
                <MinimalFileCard
                  id={id}
                  key={id}
                  name={meta.name || meta.alt}
                  type={type}
                  url={url}
                  onSelectHandler={() => onSelect({ id, url, alt: meta.alt })}
                  className={cn(" max-w-full", {
                    "ring ring-primary": selectedIds?.includes(id),
                  })}
                />
              ))}
            </div>
          ) : (
            <EmptyMedias />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MediaPickerSheet;
