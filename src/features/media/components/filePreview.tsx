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
const ImagePreview = ({
  url,
  className,
}: {
  url: string;
  className?: string;
}) => (
  <Image
    alt="preview"
    className={cn("rounded-lg object-contain size-full", className)}
    src={{ src: url, width: 168, height: 168 }}
  />
);
const AudioPreview = ({ url }: { url: string }) => (
  <audio
    muted
    className={cn("rounded-lg object-contain min-h-16 max-w-full")}
    controls
  >
    <source src={url} />
    مرورگر شما از پخش این نوع فایل پشتیبانی نمی‌کند.
  </audio>
);
const VideoPreview = ({ url }: { url: string }) => (
  <video
    muted
    className={cn("rounded-lg object-contain min-h-36 max-w-full")}
    controls
  >
    <source src={url} />
    مرورگر شما از پخش این نوع فایل پشتیبانی نمی‌کند.
  </video>
);

const DefaultFilePreview = ({
  type,
  className,
}: {
  type: MediaTypes;
  className?: string;
}) => (
  <span className={cn("*:size-16 *:mx-auto", className)}>
    {FileIconFromType[type]}
  </span>
);

const FilePreview = ({ type, url, className }: FilePreviewProps) => {
  if (url) {
    switch (type) {
      case "image":
        return <ImagePreview className={className} url={url} />;
      case "audio":
        return <AudioPreview url={url} />;
      case "video":
        return <VideoPreview url={url} />;
      default:
        return <DefaultFilePreview className={className} type={type} />;
    }
  } else {
    return <DefaultFilePreview className={className} type={type} />;
  }
};

export default FilePreview;
