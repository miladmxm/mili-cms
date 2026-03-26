import type { Currency, ProseMirror } from "@/types/type";

export type ProductType = "default" | "variable";
export type ProductStatus = "archived" | "draft" | "published";
export interface ProductPrice {
  currency: Currency;
  amount: number;
}
export interface ProductMetadata {
  price: ProductPrice;
  stock?: number;
  thumbnail?: string;
}
export interface VariableProductMetadata extends ProductMetadata {
  optionItemIds: string;
}
interface CreateProductBaseData {
  name: string;
  content: ProseMirror;
  slug: string;
  excerpt: string;
  thumbnail: string;
  authorId: string;
  status?: ProductStatus;
  categoryIds: string[];
  gallery?: string[];
  type: ProductType;
}
export type CreateProduct =
  | (CreateProductBaseData & {
      type: "default";
      metadata: ProductMetadata[];
    })
  | (CreateProductBaseData & {
      type: "variable";
      metadata: VariableProductMetadata[];
    });
