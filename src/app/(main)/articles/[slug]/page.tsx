import type { Metadata, ResolvingMetadata } from "next";

import React from "react";

import { gePostBySlug, getAllPosts } from "@/server/posts";

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(
  { params }: PageProps<"/articles/[slug]">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentMetaData = await parent;

  const slug = (await params).slug;
  // const postData = await gePostBySlug(slug);
  // if (postData) {
  //   const post = await getPostHead(postData.link);
  //   const parsed = parse(post.head);
  //   // console.log(parsed.querySelectorAll("meta"));
  //   return {
  //     title: post.title,
  //     description: post.description,
  //   };
  // }
  return { title: parentMetaData.title, description: `${slug} نام سایت` };
}

const Article = async ({ params }: PageProps<"/articles/[slug]">) => {
  const { slug } = await params;
  const postData = await gePostBySlug(slug);
  return (
    <div className="p-8" style={{ direction: "rtl" }}>
      <h1 className="my-8 text-3xl">{postData?.title.rendered}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: postData?.content.rendered ?? "" }}
      ></div>
    </div>
  );
};

export default Article;
