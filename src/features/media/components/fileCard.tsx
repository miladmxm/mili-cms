"use client";
import type { FC, PropsWithChildren } from "react";

import { Download, X } from "lucide-react";
import Link from "next/link";

import type { UploadingFileData } from "@/features/media/store/media.store";
import type {
  FileMeta,
  MediaTypes,
  MinimumMediaProps,
} from "@/services/media/type";

import CopyToClipboard from "@/components/dashboard/copy-to-clipboard";
import { Button } from "@/components/dashboard/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/ui/card";
import { Separator } from "@/components/dashboard/ui/separator";
import { Skeleton } from "@/components/dashboard/ui/skeleton";
import { cn } from "@/lib/utils";

import DeleteFile from "./deleteButton";
import FilePreview from "./filePreview";

export const MinimalFileCard: FC<
  MinimumMediaProps & { className?: string }
> = ({ id, name, url, type, onSelectHandler, className }) => {
  return (
    <Card
      className={cn("cursor-pointer", className)}
      rel="button"
      title="name"
      onClick={() => onSelectHandler(id)}
    >
      <CardContent>
        <FilePreview type={type} url={url} />
      </CardContent>
      <CardFooter className="mt-auto">
        <CardDescription className="truncate">{name}</CardDescription>
      </CardFooter>
    </Card>
  );
};

export const FileCardForUpload: FC<PropsWithChildren & UploadingFileData> = ({
  abort,
  name,
  progress,
  type,
  uri,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="truncate">{name}</CardTitle>
      </CardHeader>
      <Separator />

      <CardContent>
        <div className="max-sm:w-0-full max-sm:h-36 sm:size-44 *:size-full p-4 center">
          <FilePreview type={type} url={uri} />
        </div>
      </CardContent>
      <CardFooter className="flex gap-4 items-center">
        <div className="w-full h-2 rounded-full bg-accent overflow-hidden">
          <div
            className="h-full rounded-full bg-primary w-0 transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="w-6">{progress.toFixed(0)}%</span>
        <Button size="icon-sm" variant="destructive" onClick={abort}>
          <X />
        </Button>
      </CardFooter>
    </Card>
  );
};
interface FileData {
  id: string;
  url: string;
  meta: FileMeta;
  type: MediaTypes;
}
export const FileCardSkeleton = ({ length = 2 }: { length?: number }) => {
  const items = new Array(length).fill("").map((_, i) => i);
  return (
    <>
      {items.map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="w-11/12 h-3" />
          </CardHeader>
          <Separator />
          <CardContent>
            <Skeleton className="w-full h-36" />
          </CardContent>
          <CardFooter className="gap-2 flex mt-auto">
            <CardAction>
              <Skeleton className="size-8" />
            </CardAction>
            <CardAction>
              <Skeleton className="size-8" />
            </CardAction>
            <Skeleton className="size-8" />
          </CardFooter>
        </Card>
      ))}
    </>
  );
};
const FileCard: FC<FileData> = ({ id, type, url, meta }) => {
  return (
    <Card>
      <Link href={`/admin/media/edit/${id}`}>
        <CardHeader>
          <CardTitle className="truncate">{meta.name || meta.alt}</CardTitle>
        </CardHeader>
        <Separator />

        <CardContent>
          <div className="py-2 center">
            <FilePreview
              className="size-full max-h-32 max-w-64"
              type={type}
              url={url}
            />
          </div>
        </CardContent>
      </Link>
      <CardFooter className="gap-2 flex mt-auto">
        <CardAction>
          <DeleteFile id={id} />
        </CardAction>
        <CardAction>
          <Button asChild size="icon-sm" variant="outline">
            <a
              href={url}
              rel="noopener noreferrer"
              target="_blank"
              download={meta.name}
            >
              <Download />
            </a>
          </Button>
        </CardAction>
        <CopyToClipboard value={url} />
      </CardFooter>
    </Card>
  );
};
export default FileCard;
