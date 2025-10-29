"use client";

import type { FC } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { use } from "react";

import type { DalReturn } from "@/dal/types";
import type { Post } from "@/features/posts/types/post";

const PostsWrapper: FC<{
  posts: Promise<
    DalReturn<Pick<Post, "categories" | "id" | "image" | "slug" | "title">[]>
  >;
}> = ({ posts }) => {
  const postsQuery = use(posts);
  const router = useRouter();
  const searchParams = useSearchParams();
  if (postsQuery.success === false) return <div>Error loading posts</div>;
  const loadMore = () => {
    const search = new URLSearchParams(searchParams);
    search.set("page", ((Number(search.get("page")) || 1) + 1).toString());
    router.replace(`?${search.toString()}`, { scroll: false });
    router.refresh();
  };
  return (
    <div className="flex flex-col gap-5 w-full">
      {postsQuery.data.map((post) => (
        <article className="rounded-xl border-2 mx-auto h-96" key={post.id}>
          {post.image && (
            <Image
              height={200}
              width={300}
              alt={post.image.alt}
              blurDataURL={post.image.thumbnail}
              src={post.image.src}
              placeholder="blur"
            />
          )}
          <div className="py-5 flex gap-1">
            {post.categories?.map((category) => (
              <Link href={`/blog/${category.slug}`} key={category.id}>
                {category.name}
              </Link>
            ))}
          </div>
          <Link href={`/article/${post.slug}`}>{post.title}</Link>
        </article>
      ))}
      <button type="button" onClick={loadMore}>
        load more
      </button>
    </div>
  );
};

export default PostsWrapper;
