import env from "@/config/env";

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
