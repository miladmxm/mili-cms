import { Clapperboard, File, Image as ImageIcon, Music4 } from "lucide-react";
import Image from "next/image";

import type { MediaTypes } from "@/features/type";

const FileIconFromType = {
  image: <ImageIcon />,
  audio: <Music4 />,
  video: <Clapperboard />,
  document: <File />,
} as const;

const FilePreview = ({ type, url }: { type: MediaTypes; url?: string }) => {
  if (type === "image" && url)
    return (
      <Image
        alt="preview"
        className="rounded-lg object-contain size-full"
        src={{ src: url, width: 168, height: 168 }}
      />
    );
  else return FileIconFromType[type];
};

export default FilePreview;
