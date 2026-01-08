import { dalVerifySuccess } from "@/dal/helpers";

import { getArticle } from "../dal/query";

const EditArticle = async ({ id }: { id: string }) => {
  const article = dalVerifySuccess(await getArticle(id));
  console.log(article);
  return <div>{article?.title}</div>;
};

export default EditArticle;
