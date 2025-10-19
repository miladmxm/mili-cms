import { Suspense } from "react";

import { getAllPostsLimit } from "@/features/posts/dal/queries";

import PostsWrapper from "./cs";

const Blog = async ({
  searchParams,
}: {
  searchParams?: Promise<{ page: string }>;
}) => {
  const search = await searchParams;
  const page = search?.page || "1";
  const pageNumbaer = parseInt(page, 10);
  const offset = 10 * pageNumbaer;
  const posts = getAllPostsLimit({ offset, page: 1 });
  return (
    <Suspense fallback={<div>Loading posts...</div>}>
      <PostsWrapper posts={posts} />
    </Suspense>
  );
};

export default Blog;
