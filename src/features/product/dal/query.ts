import "server-only";

import {
  dalDbOperation,
  dalRequireAuth,
  dalVerifySuccess,
} from "@/dal/helpers";
import * as articleService from "@/services/article";

export const getArticles = async () => {
  return dalRequireAuth(
    () => dalDbOperation(() => articleService.getPaginationArticles()),
    {
      blog: ["read"],
    },
  );
};
export const getArticle = async (id: string) => {
  return dalRequireAuth(
    () => dalDbOperation(() => articleService.getArticle(id)),
    { blog: ["read"] },
  );
};
export const getCategories = async () => {
  const categories = dalVerifySuccess(
    await dalRequireAuth(
      () => dalDbOperation(articleService.getCategoriesWithThumbnail),
      {
        blog: ["read"],
      },
    ),
  );

  return categories;
};
