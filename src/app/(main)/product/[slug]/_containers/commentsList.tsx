"use client";

import { use } from "react";

import type { Comment } from "@/services/comment/type";

import RateStars from "@/components/ui/rateStars";
import SeparatorLine from "@/components/ui/separatorLine";
import { fullDateNumberFormat } from "@/utils/fullDateWithFormat";

import { useProductPageContext } from "../context";

const CommentsPlaceholder = () => {
  return (
    <div className="rounded-6xl border border-primary-500 w-full aspect-6/3 md:aspect-10/3 border-dashed center">
      <p>هیچ نظری ثبت نشده است</p>
    </div>
  );
};

const CommentCard = ({
  author: { name, role },
  content,
  status,
  createdAt,
  rate,
}: Comment) => {
  return (
    <article>
      <div className="flex items-center gap-3">
        <h6 className="font-semibold text-sm">{name}</h6>
        {rate && <RateStars className="w-18" rate={100 - (100 / 5) * rate} />}
        <time className="text-xs">
          {fullDateNumberFormat(createdAt, "fa-ir")}
        </time>
        {status === "pending" && (
          <span className="block rounded-full bg-warning px-3 py-0.5 text-gray-400">
            در انتظار برای تایید
          </span>
        )}
      </div>
      <SeparatorLine size="4" className="my-4" />
      <p>{content}</p>
    </article>
  );
};

const CommentsList = () => {
  const { comments: commentsPromise } = useProductPageContext();
  const comments = use(commentsPromise);
  console.log(comments.length);

  if (comments.length <= 0) {
    return <CommentsPlaceholder />;
  }

  return (
    <div className="flex flex-col gap-16">
      {comments.map((comment) => (
        <CommentCard key={comment.id} {...comment} />
      ))}
    </div>
  );
};

export default CommentsList;
