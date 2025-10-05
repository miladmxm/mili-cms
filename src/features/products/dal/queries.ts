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

export const getProductsByFilter = async (filter: WooStoreProductQuery) => {
  const url = toWooQueryParams(PRODUCTS_URL(), filter);

  return dalDbOperation<WooProduct[]>(() =>
    GET(url, {
      headers: generateAuthHeaders(),
    }),
  );
};

type NormalFilters = Record<"offset", number>;

export const getDicountedProducts = async (filter?: NormalFilters) => {
  return getProductsByFilter({ on_sale: true, per_page: filter?.offset });
};
export const getProductsAtLowPrices = async (filter?: NormalFilters) => {
  return getProductsByFilter({
    order: "asc",
    orderby: "price",
    per_page: filter?.offset,
  });
};
