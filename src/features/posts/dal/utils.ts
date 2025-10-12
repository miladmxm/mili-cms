import env from "@/config/env";

import type { Post, WPPost } from "../types/post";

export const WP_BASE_URL = () => new URL("wp-json/wp/v2/", env.WP_API_URL);

export const POSTS_URL = () => new URL("posts", WP_BASE_URL());

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
  if (!dateString) return new Date();
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return new Date();
  return date;
};

export const convertWPPostToPost = <W extends Partial<WPPost>>(
  wpPost: W,
): Post => {
  const allItemsPost: Post = {
    id: wpPost.id ?? 1,
    createdAt: convertOrCreateDate(wpPost.date),
    slug: wpPost.slug ?? "",
    title: wpPost.title?.rendered ?? "",
    excerpt: wpPost.excerpt?.rendered ?? "",
    content: wpPost.content?.rendered ?? "",
    image: exportImageFromWPPost(wpPost),
    updatedAt: convertOrCreateDate(wpPost.modified),
    comment_status: wpPost.comment_status ?? "closed",
    author: exportAuthorFromWPPost(wpPost),
  };

  return allItemsPost;
};
