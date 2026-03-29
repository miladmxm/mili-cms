import type { Currency, ProseMirror } from "@/types/type";

import type { FileMeta } from "../media/type";

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

export interface Product {
  categoryIds: string[];
  id: string;
  type: ProductType | null;
  name: string;
  content: ProseMirror;
  slug: string;
  excerpt: string;
  createdAt: Date;
  updatedAt: Date;
  thumbnail:
    | (string & {
        id: string;
        type: "audio" | "document" | "image" | "video";
        url: string;
        createdAt: Date;
        updatedAt: Date;
        size: number;
        meta: FileMeta;
      })
    | null;
  authorId: string;
  status: ProductStatus;
  categories: {
    categoryId: string;
  }[];
}
export interface CreateCategory {
  name: string;
  slug: string;
  thumbnail?: string | null;
  parentId?: string | null;
  description?: string;
}
export interface Category {
  name: string;
  id: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  thumbnail?: { url: string; alt: string; id: string } | null;
  parentId?: string | null;
  description?: string | null;
}
export interface CategoryTree extends Category {
  children?: CategoryTree[];
}
