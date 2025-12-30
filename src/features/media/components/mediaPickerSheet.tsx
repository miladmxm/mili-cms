"use client";
import { use } from "react";

import type { Media } from "@/features/type";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/dashboard/ui/sheet";

import EmptyMedias from "../containers/emptyMedias";
import { MinimalFileCard } from "./fileCard";

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

        <div className="overflow-y-auto h-full p-6">
          {mediasData ? (
            <div className="h-max flex flex-wrap gap-4">
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
