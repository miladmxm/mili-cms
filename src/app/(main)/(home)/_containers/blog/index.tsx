import H3 from "@/components/ui/h2";
import { getPublicArticles } from "@/features/article/dal/query";

import BlogCaruselProvider from "./blogCarusel";

const BlogSection = async () => {
  const articles = await getPublicArticles({ limit: 10, offset: 0 });
  return (
    <section className="container flex flex-col gap-12">
      <H3>بلاگ</H3>

      <BlogCaruselProvider articles={articles} />
    </section>
  );
};

export default BlogSection;
