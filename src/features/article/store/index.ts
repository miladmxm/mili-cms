import { create } from "zustand";

interface CreateArticleStates {
  defaultContentValue: string;
  previewImageUrl: string;
}

interface CreateArticleActions extends CreateArticleStates {
  setPreviewImageUrl: (url: string) => void;
  setDefaultContentValue: (content: string) => void;
}

export const useCreateArticleStore = create<CreateArticleActions>((set) => ({
  defaultContentValue: `<div dir="rtl" style="text-align: right;"><p dir="rtl"></p></div>`,
  previewImageUrl: "",
  setDefaultContentValue: (content) => set({ defaultContentValue: content }),
  setPreviewImageUrl: (url) => set({ previewImageUrl: url }),
}));
