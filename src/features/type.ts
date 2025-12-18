export const mediaTypes = ["audio", "document", "image", "video"] as const;
export type MediaTypes = (typeof mediaTypes)[number];

export interface FileMeta {
  name?: string;
  alt: string;
  title?: string;
}
