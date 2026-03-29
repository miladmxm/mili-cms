import type { ProductStatus } from "../../../../services/product/type";

export interface Product {
  id: string;
  status: ProductStatus;
  name: string;
  slug: string;
}
export const ProductDictionary: Record<keyof Product, string> = {
  status: "وضعیت",
  id: "شناسه",
  slug: "نشانی",
  name: "نام",
};
