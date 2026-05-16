import type { Media } from "@/services/media/type";

export interface Portfolio {
  id: string;
  thumbnail: Media;
  title: string;
  link: string;
}
export const PortfolioDictionary: Record<keyof Portfolio, string> = {
  id: "شناسه",
  link: "لینک",
  thumbnail: "تصویر",
  title: "عنوان",
};
