import type { QueryOptions } from "@/dal/types";

import { dalOperation, DTOifIsSuccess } from "@/dal/helpers";
import { toWooQueryParams } from "@/utils/appendSearchParams";
import { GET } from "@/utils/fetcher";
import { filterObjectByKeys } from "@/utils/filterObject";

import type { WPPost, WPPostsQuery } from "../types/post";

import { convertWPPostToPost, generateAuthHeaders, POSTS_URL } from "./utils";

export const getPosts = <T extends (keyof WPPost)[]>(
  options: QueryOptions<T, WPPostsQuery>,
) => {
  const url = toWooQueryParams(POSTS_URL(), {
    _embed: options?.embed,
    ...options?.filter,
    _fields: options.fields?.join(),
  });
  return dalOperation<Pick<WPPost, T[number]>[]>(() =>
    GET(url, {
      headers: generateAuthHeaders(),
    }),
  );
};

export const getNewPosts = () => {
  return DTOifIsSuccess(
    getPosts({
      filter: { orderby: "date", order: "desc", per_page: 5 },
      embed: true,
      fields: ["_embedded", "title", "slug", "excerpt", "id", "_links", "date"],
    }),
    // todo add selector
    (wpPosts) =>
      wpPosts.map((wpPost) =>
        filterObjectByKeys(convertWPPostToPost(wpPost), [
          "id",
          "title",
          "image",
          "excerpt",
        ]),
      ),
  );
};
