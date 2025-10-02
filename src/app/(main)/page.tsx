import Link from "next/link";

import { getAllPosts } from "@/server/posts";

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col gap-4 items-center">
      {posts.map((post) => {
        return (
          <Link href={`/articles/${post.slug}`} key={post.id}>
            {post.title.rendered}
          </Link>
        );
      })}
    </div>
  );
}
