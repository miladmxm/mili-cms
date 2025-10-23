import { cache } from "react";

import type { QueryOptions } from "@/dal/types";

import { dalOperation, DTOifIsSuccess } from "@/dal/helpers";
import { toWooQueryParams } from "@/utils/appendSearchParams";
import { GET } from "@/utils/fetcher";
import { filterObjectByKeys } from "@/utils/filterObject";

import type { WpCategoriesQueryParams, WpCategory } from "../types/category";
import type { WPPost, WPPostsQuery } from "../types/post";

import {
  convertWPCategoryToPostCategory,
  convertWPPostToPost,
  generateAuthHeaders,
  POSTS_CATEGORY_URL,
  POSTS_URL,
} from "./utils";

export const getPosts = cache(
  <T extends (keyof WPPost)[]>(options: QueryOptions<T, WPPostsQuery>) => {
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
  },
);
export const getCategories = cache(
  <T extends (keyof WpCategory)[]>(
    options: QueryOptions<T, WpCategoriesQueryParams>,
  ) => {
    const url = toWooQueryParams(POSTS_CATEGORY_URL(), {
      ...options?.filter,
      _fields: options.fields?.join(),
    });
    return dalOperation<Pick<WpCategory, T[number]>[]>(() =>
      GET(url, {
        headers: generateAuthHeaders(),
      }),
    );
  },
);
export const getAllCategories = () => {
  return DTOifIsSuccess(
    getCategories({ fields: ["count", "slug", "id", "name", "description"] }),
    (wpCategories) =>
      wpCategories.map((wpCategory) =>
        filterObjectByKeys(convertWPCategoryToPostCategory(wpCategory), [
          "count",
          "slug",
          "description",
          "id",
          "name",
        ]),
      ),
  );
};

export const getCategoryIdBySlug = (slug: string) => {
  return DTOifIsSuccess(
    getCategories({
      fields: ["id"],
      filter: { slug },
    }),
    (wpCategory) => wpCategory[0]?.id,
  );
};

export const getAllPosts = () => {
  return DTOifIsSuccess(
    getPosts({
      fields: ["slug", "id"],
      embed: true,
      filter: {
        order: "desc",
        orderby: "date",
      },
    }),
    (wpPosts) =>
      wpPosts.map((wpPost) =>
        filterObjectByKeys(convertWPPostToPost(wpPost), ["id", "slug"]),
      ),
  );
};

export const getPostsByLimit = (filter?: {
  offset?: number;
  categories?: number | number[];
  page?: number;
}) => {
  const defaultFilter = { offset: 10, page: 1, ...filter };
  return DTOifIsSuccess(
    getPosts({
      fields: [
        "title",
        "_embedded",
        "slug",
        "id",
        "_links",
        "date",
        "categories",
      ],
      embed: true,
      filter: {
        categories: defaultFilter.categories,
        order: "desc",
        orderby: "date",
        per_page: defaultFilter.offset,
        page: defaultFilter.page,
      },
    }),
    (wpPosts) =>
      wpPosts.map((wpPost) =>
        filterObjectByKeys(convertWPPostToPost(wpPost), [
          "id",
          "title",
          "image",
          "slug",
          "categories",
        ]),
      ),
  );
};

export const getNewPosts = () => {
  return DTOifIsSuccess(
    getPosts({
      filter: { orderby: "date", order: "desc", per_page: 5 },
      embed: true,
      fields: ["_embedded", "title", "slug", "excerpt", "id", "_links", "date"],
    }),
    (wpPosts) =>
      wpPosts.map((wpPost) =>
        filterObjectByKeys(convertWPPostToPost(wpPost), [
          "id",
          "title",
          "image",
          "excerpt",
          "slug",
        ]),
      ),
  );
};

export const getPostBySlug = (slug: string) => {
  return DTOifIsSuccess(
    getPosts({ embed: true, filter: { slug } }),
    (wpPosts) => convertWPPostToPost(wpPosts[0]),
  );
};
