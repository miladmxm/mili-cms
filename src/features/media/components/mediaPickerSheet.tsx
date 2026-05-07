"use client";

import type { RefObject } from "react";

import { Upload } from "lucide-react";
import { use, useImperativeHandle, useState } from "react";

import EmptyPlaceholder from "@/components/dashboard/empty";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/dashboard/ui/sheet";
import { Spinner } from "@/components/dashboard/ui/spinner";
import { cn } from "@/lib/utils";

import type { MediaContextKey } from "../context/types";

import { useMediaContext } from "../context";
import { typesFromMediaContextKey } from "../context/utils";
import { useInfinityScroll } from "../hooks/useInfinityScroll";
import { MinimalFileCard } from "./fileCard";
import MediaCardWrapper from "./MediaCardWrapper";
import MediaDropzone from "./mediaDropzone";
import DisplayUploadingFiles from "./uploadingFiles";

export interface SheetController {
  open: () => void;
  close: () => void;
}

const MediaPickerSheet = ({
  mediaKey,
  onSelect,
  selectedIds,
  controllerRef,
}: {
  mediaKey: MediaContextKey;
  selectedIds?: string[];
  onSelect: (data: { id: string; url: string; alt: string }) => void;
  controllerRef: RefObject<SheetController | null>;
}) => {
  const media = useMediaContext(mediaKey);
  const mediaData = use(media);
  const { handleScroll, wrapperRef, pending } = useInfinityScroll(mediaData);
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
          <MediaDropzone acceptTypes={typesFromMediaContextKey(mediaKey)} />
          <DisplayUploadingFiles />
          {pending && <Spinner className="size-10 mx-auto" />}
          {mediaData ? (
            <>
              <MediaCardWrapper
                className="h-max auto-rows-min pe-2"
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
              </MediaCardWrapper>
              {pending && (
                <div className="center h-10">
                  <Spinner />
                </div>
              )}
            </>
          ) : (
            <EmptyPlaceholder
              link="/admin/media"
              title="هیچ رسانه ای وجود ندارد"
              type="link"
              icon={Upload}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MediaPickerSheet;
