import { redirect } from "next/navigation";
import { Suspense } from "react";

import {
  getCategoryIdBySlug,
  getPostsByLimit,
} from "@/features/posts/dal/queries";
import { getPageRenderItemCounterByOffsetInSearchParams } from "@/utils/getFromSearchParams";

import PostsWrapper from "../postsWrapper";

const BlogCategory = async ({
  params,
  searchParams,
}: PageProps<"/blog/[slug]">) => {
  const { slug } = await params;
  const categoryId = await getCategoryIdBySlug(slug);
  if (!categoryId.success || !categoryId.data) return redirect("/blog");

  const offset =
    await getPageRenderItemCounterByOffsetInSearchParams(searchParams);
  const posts = getPostsByLimit({
    offset,
    page: 1,
    categories: categoryId.data,
  });
  return (
    <Suspense fallback={<div>loading...</div>}>
      <PostsWrapper posts={posts} />
    </Suspense>
  );
};

export default BlogCategory;
