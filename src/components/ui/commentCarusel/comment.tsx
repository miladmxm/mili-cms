import type { Comment } from "@/services/comment/type";

import DefaultImage from "../defaultImage";

const CommentCard = ({ author, content }: Comment) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-5">
        <DefaultImage
          image={author.thumbnail}
          width={70}
          height={70}
          alt="user profile"
          className="rounded-full aspect-square size-8 bg-white p-2 md:size-16"
        />
        <strong className="font-bold text-sm md:text-2xl text-primary-900">
          {author.name}
        </strong>
      </div>
      <p className="text-justify text-thready-900 p-8 bg-white shadow-sm-gray rounded-b-6xl rounded-se-6xl max-md:text-xs font-semibold">
        {content}
      </p>
    </div>
  );
};

export default CommentCard;
