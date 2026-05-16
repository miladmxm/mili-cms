import type { Media } from "../media/type";

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  link: string;
  thumbnail: Media;
}

export interface CreatePortfolio {
  title: string;
  description?: string;
  link?: string;
  thumbnailId: string;
}
