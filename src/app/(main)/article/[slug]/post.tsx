"use clint";

import type { FC } from "react";

import Image from "next/image";
import { redirect } from "next/navigation";
import { use } from "react";

import type { DalReturn } from "@/dal/types";
import type { Post } from "@/features/posts/types/post";

import purify from "@/utils/purify";

const RenderPost: FC<{ post: Promise<DalReturn<Post>> }> = ({ post }) => {
  const postData = use(post);
  if (!postData.success) redirect("/blog");
  return (
    <div>
      {postData.data.image && (
        <Image
          height={500}
          width={400}
          alt={postData.data.image.alt}
          src={postData.data.image.src}
        />
      )}
      <h1 className="my-8 text-3xl">{postData.data.title}</h1>

      <div
        dangerouslySetInnerHTML={{ __html: purify(postData.data.content) }}
      ></div>
    </div>
  );
};

export default RenderPost;
