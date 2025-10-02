import { cache } from "react";

import type { Article } from "@/types/article.types";
import "server-only";

export const getAllPosts = cache(async (): Promise<Article[]> => {
  try {
    const headers = new Headers();
    headers.set(
      "Authorization",
      `Basic ${Buffer.from(
        `${process.env.WP_TOKEN_NAME}:${process.env.WP_TOKEN_SECRET}`,
      ).toString("base64")}`,
    );

    const res = await fetch(`${process.env.WP_API_URL}/wp-json/wp/v2/posts`, {
      headers,
    });

    const responseJson: Article[] = await res.json();
    return responseJson;
  } catch (err) {
    console.log(err);
    return [];
  }
});
export const gePostBySlug = cache(
  async (slug: string): Promise<Article | null> => {
    try {
      const headers = new Headers();
      headers.set(
        "Authorization",
        `Basic ${Buffer.from(
          `${process.env.WP_TOKEN_NAME}:${process.env.WP_TOKEN_SECRET}`,
        ).toString("base64")}`,
      );
      const res = await fetch(
        `${process.env.WP_API_URL}/wp-json/wp/v2/posts?slug=${slug}`,
        {
          headers,
        },
      );

      const responseJson: Article[] = await res.json();
      return responseJson[0];
    } catch (err) {
      console.log(err);

      return null;
    }
  },
);

export const getPostHead = cache(async (link: string) => {
  try {
    const headers = new Headers();
    headers.set(
      "Authorization",
      `Basic ${Buffer.from(
        `${process.env.WP_TOKEN_NAME}:${process.env.WP_TOKEN_SECRET}`,
      ).toString("base64")}`,
    );

    const res = await fetch(
      `${process.env.WP_API_URL}/wp-json/rankmath/v1/getHead?url=${link}`,
      {
        headers,
      },
    );

    const responseJson = await res.json();
    return responseJson;
  } catch (err) {
    console.log(err);
  }
});
