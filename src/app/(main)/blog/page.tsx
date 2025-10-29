import { cacheLife } from "next/cache";
import { Suspense } from "react";

import type { SearchParams } from "@/types/type";

import { getPostsByLimit } from "@/features/posts/dal/queries";
import { getPageRenderItemCounterByOffsetInSearchParams } from "@/utils/getFromSearchParams";

import PostsWrapper from "./postsWrapper";

const Blog = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  "use cache: private";
  cacheLife("hours");
  const offset =
    await getPageRenderItemCounterByOffsetInSearchParams(searchParams);
  const posts = getPostsByLimit({ offset, page: 1 });
  return <PostsWrapper posts={posts} />;
};
const BlogWrapper = ({ searchParams }: PageProps<"/blog">) => {
  return (
    <Suspense fallback="loading">
      <Blog searchParams={searchParams} />
    </Suspense>
  );
};
export default BlogWrapper;
