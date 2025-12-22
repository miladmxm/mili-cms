import type { FC, PropsWithChildren } from "react";

import { Download, X } from "lucide-react";
import Link from "next/link";

import type { FileMeta, MediaTypes } from "@/features/type";
import type { UploadingFileData } from "@/store/media.store";

import CopyToClipboard from "@/components/dashboard/copy-to-clipboard";
import { Button } from "@/components/dashboard/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/ui/card";
import { Separator } from "@/components/dashboard/ui/separator";

import DeleteFile from "./deleteButton";
import FilePreview from "./filePreview";

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
        <CardTitle>{name}</CardTitle>
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
