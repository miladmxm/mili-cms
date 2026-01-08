import env from "@/config/env";

import type { Media } from "./type";

export const DTOconvertMediaPathToRealUrl = (mediaPath: string) => {
  return `${env.S3_ENDPOINT}/${env.S3_BUCKET}/${mediaPath}`;
};
export const DTOconvertMediaToRealUrlMedia = (medias: Media[]) => {
  return medias.map((media) => {
    media.url = DTOconvertMediaPathToRealUrl(media.url);
    return media;
  });
};
