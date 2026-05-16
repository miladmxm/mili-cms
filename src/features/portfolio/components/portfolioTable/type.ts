import type { Media } from "@/services/media/type";

export interface PortfolioTable {
  id: string;
  thumbnail: Media;
  title: string;
  link: string;
}
export const PortfolioDictionary: Record<keyof PortfolioTable, string> = {
  id: "شناسه",
  link: "لینک",
  thumbnail: "تصویر",
  title: "عنوان",
};
