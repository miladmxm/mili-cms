import { create } from "zustand";

interface CreateArticleStates {
  previewImageUrl: string;
}

interface CreateArticleActions extends CreateArticleStates {
  setPreviewImageUrl: (url: string) => void;
}

export const useCreateArticleStore = create<CreateArticleActions>((set) => ({
  previewImageUrl: "",
  setPreviewImageUrl: (url) => set({ previewImageUrl: url }),
}));
