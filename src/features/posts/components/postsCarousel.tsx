import Image from "next/image";

import purify from "@/utils/purify";

import { getNewPosts } from "../dal/queries";

const PostsCarousel = async () => {
  const posts = await getNewPosts();
  if (!posts.success) return null;
  console.log(posts.data);
  return (
    <div>
      {posts.data.map((post) => {
        return (
          <div key={post.id}>
            <h2>{post.title}</h2>
            {post.image && (
              <Image
                height={400}
                width={400}
                alt={post.image.alt}
                blurDataURL={post.image.thumbnail}
                src={post.image.src}
                placeholder="blur"
              />
            )}
            <div dangerouslySetInnerHTML={{ __html: purify(post.excerpt) }} />
          </div>
        );
      })}
    </div>
  );
};

export default PostsCarousel;
