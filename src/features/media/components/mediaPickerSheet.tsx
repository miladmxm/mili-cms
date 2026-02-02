"use client";
import type { RefObject } from "react";

import { useLinkStatus } from "next/link";
import { use, useImperativeHandle, useState } from "react";

import type { Media } from "@/services/media/type";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/dashboard/ui/sheet";
import { Spinner } from "@/components/dashboard/ui/spinner";

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
  const { pending } = useLinkStatus();
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
          {pending && <Spinner className="size-10 mx-auto" />}
          {mediasData ? (
            <div className="h-max grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 pe-2 auto-rows-min">
              {mediasData.map(({ id, meta, url, type }) => (
                <MinimalFileCard
                  className=" max-w-full"
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
