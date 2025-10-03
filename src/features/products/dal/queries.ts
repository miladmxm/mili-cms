import "server-only";

import { dalDbOperation, DTOifIsSuccess } from "@/dal/helpers";
import { appendSearchParams } from "@/utils/appendSearchParams";
import { GET } from "@/utils/fetcher";
import { filterArrayByObjectKeyValue } from "@/utils/filterArrayByObjectKey";

import type { Category, WooProduct } from "../types";

import {
  generateAuthHeaders,
  PRODUCTS_CATEGORIES_URL,
  PRODUCTS_URL,
} from "./utils";

type GetAllParentCategoriesOptions = (keyof Category)[];

export const getAllParentCategories = async (
  fields?: GetAllParentCategoriesOptions,
) => {
  const url = appendSearchParams(PRODUCTS_CATEGORIES_URL, {
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

export const getAllDicountProducts = async () => {
  const url = appendSearchParams(PRODUCTS_URL, { on_sale: "true" });
  return dalDbOperation<WooProduct[]>(() =>
    GET(url, {
      headers: generateAuthHeaders(),
    }),
  );
};
