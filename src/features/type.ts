export const mediaTypes = ["audio", "document", "image", "video"] as const;
export type MediaTypes = (typeof mediaTypes)[number];

export interface FileMeta {
  name?: string;
  alt: string;
  title?: string;
}
export interface MinimumMediaProps {
  name: string;
  id: string;
  url: string;
  type: MediaTypes;
  onSelectHandler: (id: string) => void;
}

export interface Media {
  type: MediaTypes;
  url: string;
  id: string;
  size: number;
  meta: FileMeta;
  createdAt: Date;
  updatedAt: Date;
}
