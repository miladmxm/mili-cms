import { create } from "zustand";

import type { MediaTypes } from "@/services/media/type";

export interface UploadingFileData {
  type: MediaTypes;
  progress: number;
  id: string;
  name: string;
  abort: XMLHttpRequest["abort"];
  uri?: string;
}

interface State {
  uploadingMedia: UploadingFileData[];
}

interface Actions {
  addToUploadingMedia: (media: State["uploadingMedia"][number]) => void;
  removeFromUploadingMedia: (id: string) => void;
  setProgressById: (id: string, progress: number) => void;
}

export const useMediaStore = create<Actions & State>((set) => ({
  uploadingMedia: [],
  removeFromUploadingMedia: (id) =>
    set(({ uploadingMedia }) => ({
      uploadingMedia: uploadingMedia.filter((item) => item.id !== id),
    })),
  setProgressById: (id, progress) =>
    set(({ uploadingMedia }) => {
      const updatedItem = uploadingMedia.map((item) => {
        if (item.id === id) {
          item.progress = progress;
        }
        return item;
      });
      return { uploadingMedia: updatedItem };
    }),
  addToUploadingMedia: (media) =>
    set(({ uploadingMedia }) => ({
      uploadingMedia: [...uploadingMedia, media],
    })),
}));
