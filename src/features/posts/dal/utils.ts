import env from "@/config/env";

import type { PostCategory, WpCategory } from "../types/category";
import type { Post, WPPost } from "../types/post";

export const WP_BASE_URL = () => new URL("wp-json/wp/v2/", env.WP_API_URL);

export const POSTS_URL = () => new URL("posts", WP_BASE_URL());
export const POSTS_CATEGORY_URL = () => new URL("categories", WP_BASE_URL());

export const getAuthorizationToken = () => {
  return `Basic ${Buffer.from(
    `${env.WP_TOKEN_NAME}:${env.WP_TOKEN_SECRET}`,
  ).toString("base64")}`;
};

export const generateAuthHeaders = () => {
  return {
    Authorization: getAuthorizationToken(),
  };
};

const exportImageFromWPPost = (wpPost: Partial<WPPost>) => {
  const wpImage = wpPost._embedded?.["wp:featuredmedia"]?.[0];
  if (!wpImage) return undefined;
  return {
    id: wpImage.id,
    src: wpImage.source_url,
    thumbnail: wpImage.media_details.sizes["thumbnail"].source_url,
    alt: wpImage.alt_text,
  };
};
const exportAuthorFromWPPost = (wpPost: Partial<WPPost>) => {
  const wpAuthor = wpPost._embedded?.author?.[0];
  if (!wpAuthor) return undefined;
  return {
    id: wpAuthor.id,
    name: wpAuthor.name,
    description: wpAuthor.description,
    slug: wpAuthor.slug,
    avatar: Object.values(wpAuthor.avatar_urls)[0],
  };
};

const convertOrCreateDate = (dateString?: string) => {
  if (!dateString) return performance.now();
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return performance.now();
  return date.getTime();
};
const exportCategoriesFromWPPost = (
  wpPost: Partial<WPPost>,
): Post["categories"] => {
  const categories: Post["categories"] = [];
  for (const category of wpPost._embedded?.["wp:term"].flat() ?? []) {
    if (category.taxonomy === "category") {
      const { name, slug, id } = category;
      categories.push({ name, slug, id });
    }
  }
  return categories;
};
export const convertWPPostToPost = <W extends Partial<WPPost>>(
  wpPost: W,
): Post => {
  const allItemsPost: Post = {
    id: wpPost.id ?? NaN,
    createdAt: convertOrCreateDate(wpPost.date),
    slug: wpPost.slug ?? "",
    title: wpPost.title?.rendered ?? "",
    excerpt: wpPost.excerpt?.rendered ?? "",
    content: wpPost.content?.rendered ?? "",
    image: exportImageFromWPPost(wpPost),
    updatedAt: convertOrCreateDate(wpPost.modified),
    comment_status: wpPost.comment_status ?? "closed",
    author: exportAuthorFromWPPost(wpPost),
    categories: exportCategoriesFromWPPost(wpPost),
  };

  return allItemsPost;
};

export const convertWPCategoryToPostCategory = (
  wpCategory: Partial<WpCategory>,
): PostCategory => {
  const postCategory: PostCategory = {
    count: wpCategory.count ?? 0,
    description: wpCategory.description ?? "",
    id: wpCategory.id ?? 0,
    name: wpCategory.name ?? "",
    parent: wpCategory.parent,
    slug: wpCategory.slug ?? "",
  };
  return postCategory;
};
