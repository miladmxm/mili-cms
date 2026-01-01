import { IconListDetails } from "@tabler/icons-react";

import EmptyPlaceholder from "@/components/dashboard/empty";

import { getArticles } from "../dal/query";
import { ArticleTable } from "./articleTable";

const AllArticles = async () => {
  const articles = await getArticles();
  if (!articles.length)
    return (
      <EmptyPlaceholder
        link="/admin/blog/add"
        linkTitle="افزودن مقاله"
        title="هیچ مقاله ای نیست"
        description="موردی در پایگاه داده یافت نشد"
        icon={IconListDetails}
      />
    );
  return <ArticleTable data={articles} />;
};

export default AllArticles;
