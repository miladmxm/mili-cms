import { IconListDetails } from "@tabler/icons-react";

import EmptyPlaceholder from "@/components/dashboard/empty";

const AllArticles = () => {
  return (
    <EmptyPlaceholder
      link="/admin/blog/add"
      linkTitle="افزودن مقاله"
      title="هیچ مقاله ای نیست"
      description="موردی در پایگاه داده یافت نشد"
      icon={IconListDetails}
    />
  );
};

export default AllArticles;
