import type { MediaTypes } from "@/services/media/type";

import type { MediaContextKey } from "./types";

export const typesFromMediaContextKey = (key: MediaContextKey) =>
  key.split("-") as MediaTypes[];
