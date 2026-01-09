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
  uploadingMedias: UploadingFileData[];
}

interface Actions {
  addToUploadingMedias: (media: State["uploadingMedias"][number]) => void;
  removeFromUploadingMedias: (id: string) => void;
  setProgressById: (id: string, progress: number) => void;
}

export const useMediaStore = create<Actions & State>((set) => ({
  uploadingMedias: [],
  removeFromUploadingMedias: (id) =>
    set(({ uploadingMedias }) => ({
      uploadingMedias: uploadingMedias.filter((item) => item.id !== id),
    })),
  setProgressById: (id, progress) =>
    set(({ uploadingMedias }) => {
      const updatedItem = uploadingMedias.map((item) => {
        if (item.id === id) {
          item.progress = progress;
        }
        return item;
      });
      return { uploadingMedias: updatedItem };
    }),
  addToUploadingMedias: (media) =>
    set(({ uploadingMedias }) => ({
      uploadingMedias: [...uploadingMedias, media],
    })),
}));
