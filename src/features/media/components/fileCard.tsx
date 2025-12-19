import type { FC, PropsWithChildren } from "react";

import {
  Clapperboard,
  File,
  Image as ImageIcon,
  Music4,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { FileMeta, MediaTypes } from "@/features/type";
import type { UploadingFileData } from "@/store/media.store";

import { Button } from "@/components/dashboard/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/ui/card";
import { Separator } from "@/components/dashboard/ui/separator";

const FileIconFromType = {
  image: <ImageIcon />,
  audio: <Music4 />,
  video: <Clapperboard />,
  document: <File />,
} as const;

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
          {type === "image" && uri ? (
            <Image
              alt="preview"
              className="rounded-lg object-contain"
              src={{ src: uri, width: 168, height: 168 }}
            />
          ) : (
            FileIconFromType[type]
          )}
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
    <Link href={`/admin/media/edit/${id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{meta.name || meta.alt}</CardTitle>
        </CardHeader>
        <Separator />

        <CardContent>
          <div className="max-sm:w-0-full max-sm:h-36 sm:size-44 *:size-full p-4 center">
            {FileIconFromType[type]}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
export default FileCard;
