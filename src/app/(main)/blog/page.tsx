import { Suspense } from "react";

import { getPostsByLimit } from "@/features/posts/dal/queries";
import { getPageRenderItemCounterByOffsetInSearchParams } from "@/utils/getFromSearchParams";

import PostsWrapper from "./postsWrapper";

const Blog = async ({ searchParams }: PageProps<"/blog">) => {
  const offset =
    await getPageRenderItemCounterByOffsetInSearchParams(searchParams);
  const posts = getPostsByLimit({ offset, page: 1 });
  return (
    <Suspense fallback={<div>Loading posts...</div>}>
      <PostsWrapper posts={posts} />
    </Suspense>
  );
};

export default Blog;
