import type { ComponentProps } from "react";

import { ImageIcon } from "lucide-react";
import Image from "next/image";

const DefaultImage = ({
  image,
  alt,
  width,
  height,
  ...props
}: Partial<Omit<ComponentProps<typeof Image>, "src">> & {
  image?: { url: string; alt: string; id: string } | null;
}) => {
  if (!image) {
    return (
      <div className={props.className}>
        <ImageIcon />
      </div>
    );
  }

  return (
    <Image
      src={image.url}
      alt={alt || image.alt}
      width={width || 500}
      height={width || 500}
      {...props}
    />
  );
};

export default DefaultImage;
