import * as articleRepo from "@/repositories/article.repo";
import "server-only";

import type { CreateArticle } from "../types";

export const createArticle = (data: CreateArticle) => {
  //todo has access
  return articleRepo.createArticle(data);
};
