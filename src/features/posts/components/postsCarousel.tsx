import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";

import { getNewPosts } from "../dal/queries";

const PostsCarousel = async () => {
  "use cache";
  cacheTag("posts");
  cacheLife("hours");
  const posts = await getNewPosts();
  if (!posts.success) return null;
  return (
    <div>
      {posts.data.map((post) => {
        return (
          <div key={post.id}>
            <h2>
              <Link href={`/article/${post.slug}`}>{post.title}</Link>
            </h2>
            {post.image && (
              <Link href={`/article/${post.slug}`}>
                <Image
                  height={400}
                  width={400}
                  alt={post.image.alt}
                  blurDataURL={post.image.thumbnail}
                  src={post.image.src}
                  placeholder="blur"
                />
              </Link>
            )}
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </div>
        );
      })}
    </div>
  );
};

export default PostsCarousel;
