import { IconListDetails } from "@tabler/icons-react";

import EmptyPlaceholder from "@/components/dashboard/empty";
import { dalVerifySuccess } from "@/dal/helpers";

import { ArticleTable } from "../components/articleTable";
import { getArticles } from "../dal/query";

const AllArticles = async () => {
  const articles = dalVerifySuccess(await getArticles());
  if (!articles.length)
    return (
      <EmptyPlaceholder
        link="/admin/blog/add"
        title="هیچ مقاله ای نیست"
        type="link"
        actionTitle="افزودن مقاله"
        description="موردی در پایگاه داده یافت نشد"
        icon={IconListDetails}
      />
    );
  return <ArticleTable data={articles} />;
};

export default AllArticles;
