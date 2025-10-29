import type { Metadata, ResolvingMetadata } from "next";

import { cacheLife } from "next/cache";
import { Suspense } from "react";

import { getAllPosts, getPostBySlug } from "@/features/posts/dal/queries";

import Post from "./post";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  if (!posts.success) return [];
  return posts.data.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(
  { params }: PageProps<"/article/[slug]">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentMetaData = await parent;

  const slug = (await params).slug;

  return { title: parentMetaData.title, description: `${slug} نام سایت` };
}

const Article = async ({ params }: PageProps<"/article/[slug]">) => {
  "use cache";
  cacheLife("hours");
  const { slug } = await params;

  const post = getPostBySlug(slug);

  return (
    <div className="p-8" style={{ direction: "rtl" }}>
      <Suspense fallback={<div>loading...</div>}>
        <Post post={post} />
      </Suspense>
    </div>
  );
};

export default Article;
