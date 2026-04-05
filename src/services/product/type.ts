import type { Currency, ProseMirror } from "@/types/type";

import type { Media } from "../media/type";

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
  thumbnailId: string;
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
  name: string;
  content: ProseMirror;
  slug: string;
  excerpt: string;
  createdAt: Date;
  updatedAt: Date;
  thumbnail: Media;
  authorId: string;
  status: ProductStatus;
  type: ProductType;
}
export interface CreateCategory {
  name: string;
  slug: string;
  thumbnailId?: string | null;
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

export interface CreateOptionItem {
  label: string;
  value: string;
}
export interface CreateOption {
  name: string;
  slug: string;
  description?: string | undefined;
  items: CreateOptionItem[];
}
export interface OptionItem {
  value: string;
  id: string;
  label: string;
}
export interface Option {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  items: OptionItem[];
}
