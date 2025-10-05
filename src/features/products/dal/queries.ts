import "server-only";

import { dalDbOperation, DTOifIsSuccess } from "@/dal/helpers";
import {
  appendSearchParams,
  toWooQueryParams,
} from "@/utils/appendSearchParams";
import { GET } from "@/utils/fetcher";
import { filterArrayByObjectKeyValue } from "@/utils/filterArrayByObjectKey";

import type { Category } from "../types/category";
import type { WooProduct, WooStoreProductQuery } from "../types/products";

import {
  generateAuthHeaders,
  PRODUCTS_CATEGORIES_URL,
  PRODUCTS_URL,
} from "./utils";

type GetAllParentCategoriesOptions = (keyof Category)[];

export const getAllParentCategories = async (
  fields?: GetAllParentCategoriesOptions,
) => {
  const url = appendSearchParams(PRODUCTS_CATEGORIES_URL(), {
    parent: "0",
    hide_empty: "false",
    _fields: fields?.join(),
  });
  return DTOifIsSuccess(
    dalDbOperation<Category[]>(() =>
      GET(url, {
        headers: generateAuthHeaders(),
      }),
    ),
    (res) => filterArrayByObjectKeyValue(res, "name", "Uncategorized"),
  );
};

interface GetProductsOptions {
  filter?: WooStoreProductQuery;
  fields?: (keyof WooProduct)[];
}
export const getProducts = async (options?: GetProductsOptions) => {
  const url = toWooQueryParams(PRODUCTS_URL(), {
    ...options?.filter,
    _fields: options?.fields?.join(),
  });
  console.log(url);
  return dalDbOperation<WooProduct[]>(() =>
    GET(url, {
      headers: generateAuthHeaders(),
    }),
  );
};

type NormalFilters = Record<"offset", number>;

export const getDicountedProducts = (filter?: NormalFilters) => {
  return getProducts({
    filter: { on_sale: true, per_page: filter?.offset },
    fields: ["id", "name", "prices"],
  });
};
export const getProductsAtLowPrices = (filter?: NormalFilters) => {
  return getProducts({
    filter: {
      order: "asc",
      orderby: "price",
      per_page: filter?.offset,
    },
    fields: ["name", "price_html", "id", "images", "slug"],
  });
};
