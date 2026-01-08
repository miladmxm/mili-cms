import { Clapperboard, File, Image as ImageIcon, Music4 } from "lucide-react";
import Image from "next/image";

import type { MediaTypes } from "@/services/media/type";

import { cn } from "@/lib/utils";

const FileIconFromType = {
  image: <ImageIcon />,
  audio: <Music4 />,
  video: <Clapperboard />,
  document: <File />,
} as const;
interface FilePreviewProps {
  type: MediaTypes;
  url?: string;
  className?: string;
}
const FilePreview = ({ type, url, className }: FilePreviewProps) => {
  if (type === "image" && url)
    return (
      <Image
        alt="preview"
        className={cn("rounded-lg object-contain size-full", className)}
        src={{ src: url, width: 168, height: 168 }}
      />
    );
  else return FileIconFromType[type];
};

export default FilePreview;
