import type { ProductStatus } from "../../../../services/product/type";

export interface ProductTable {
  id: string;
  status: ProductStatus;
  name: string;
  slug: string;
}
export const ProductDictionary: Record<keyof ProductTable, string> = {
  status: "وضعیت",
  id: "شناسه",
  slug: "نشانی",
  name: "نام",
};
