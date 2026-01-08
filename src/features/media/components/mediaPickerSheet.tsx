"use client";
import { use } from "react";

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

const MediaPickerSheet = ({
  medias,
  onOpenChange,
  open,
  onSelect,
}: {
  medias: Promise<Media[]>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (data: { id: string; url: string }) => void;
}) => {
  const mediasData = use(medias);

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
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
                  onSelectHandler={() => onSelect({ id, url })}
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
