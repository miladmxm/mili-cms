import * as articleRepo from "@/repositories/article.repo";

export const getArticles = () => {
  //todo has access
  return articleRepo.findArticlesByLimitAndOffset();
};
