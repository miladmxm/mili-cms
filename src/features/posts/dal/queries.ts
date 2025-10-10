import type { QueryOptions } from "@/dal/types";

import { dalOperation } from "@/dal/helpers";
import { toWooQueryParams } from "@/utils/appendSearchParams";
import { GET } from "@/utils/fetcher";

import type { WPPost, WPPostsQuery } from "../types/post";

import { generateAuthHeaders, POSTS_URL } from "./utils";

type GetPostsOptions = QueryOptions<WPPost, WPPostsQuery>;
export const getPosts = (options: GetPostsOptions) => {
  const url = toWooQueryParams(POSTS_URL(), {
    _embed: options?.embed,
    ...options?.filter,
    _fields: options?.fields?.join(),
  });
  return dalOperation<WPPost[]>(() =>
    GET(url, {
      headers: generateAuthHeaders(),
    }),
  );
};

export const getNewPosts = () => {
  return getPosts({
    filter: { orderby: "date", order: "desc", per_page: 5 },
    embed: true,
    fields: ["_embedded", "title", "slug", "excerpt", "id", "_links", "date"],
    // if filter fileds and active embed, _embedded and _links must be in fields array
  });
};
