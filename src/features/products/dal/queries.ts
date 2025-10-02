import "server-only";

import { appendSearchParams } from "@/utils/appendSearchParams";
import { GET } from "@/utils/fetcher";

import { generateAuthHeaders, PRODUCTS_CATEGORIES_URL } from "./utils";

export const getAllParentCategories = async () => {
  const url = appendSearchParams(PRODUCTS_CATEGORIES_URL, {
    parent: "0",
    per_page: "100",
    orderby: "name",
    order: "asc",
    hide_empty: "false",
  });
  console.log(url);
  const res = await GET(url, {
    headers: generateAuthHeaders(),
  });

  return res;
};
