"use client";
import type { RefObject } from "react";

import { use, useImperativeHandle, useState } from "react";

import type { Media } from "@/services/media/type";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/dashboard/ui/sheet";

import EmptyMedias from "../containers/emptyMedias";
import { MinimalFileCard } from "./fileCard";
import MediaDropzone from "./mediaDropzone";
import DisplayUploadingFiles from "./uploadingFiles";

export interface SheetController {
  open: () => void;
  close: () => void;
}
const MediaPickerSheet = ({
  medias,
  onSelect,
  controllerRef,
}: {
  medias: Promise<Media[]>;
  onSelect: (data: { id: string; url: string; alt: string }) => void;
  controllerRef: RefObject<SheetController | null>;
}) => {
  const mediasData = use(medias);
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

        <div className="overflow-y-auto h-full p-6 container gap-6 flex flex-col">
          <MediaDropzone />
          <DisplayUploadingFiles />
          {mediasData ? (
            <div className="h-max flex flex-wrap max-sm:justify-center gap-4">
              {mediasData.map(({ id, meta, url, type }) => (
                <MinimalFileCard
                  className="size-80"
                  id={id}
                  key={id}
                  name={meta.name || meta.alt}
                  type={type}
                  url={url}
                  onSelectHandler={() => onSelect({ id, url, alt: meta.alt })}
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
