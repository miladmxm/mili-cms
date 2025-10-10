import Image from "next/image";

import { getNewPosts } from "../dal/queries";

const PostsCarousel = async () => {
  const posts = await getNewPosts();
  if (!posts.success) return null;
  return (
    <div>
      {posts.data.map((post) => {
        const isHaveThumbnail =
          post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
        return (
          <div key={post.id}>
            <h2>{post.title.rendered}</h2>
            {isHaveThumbnail && (
              <Image
                height={400}
                width={400}
                alt="fdfs"
                src={isHaveThumbnail}
              />
            )}
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </div>
        );
      })}
    </div>
  );
};

export default PostsCarousel;
