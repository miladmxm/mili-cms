import { cacheTag } from "next/cache";

import { findMedias } from "@/repositories/media.repo";
import "server-only";

export const getMedias = async () => {
  "use cache";
  cacheTag("media");
  return findMedias();
};
