"use client";

import { use } from "react";

import type { Comment } from "@/services/comment/type";

import Pen from "@/assets/icons/pen.svg";
import SeparatorLine from "@/components/ui/separatorLine";
import { fullDateNumberFormat } from "@/utils/fullDateWithFormat";

import { useProductPageContext } from "../context";

type QACommentWithReplies = Comment & {
  replies: Comment[];
};

const QAPlaceholder = () => {
  return (
    <div className="rounded-6xl border border-primary-500 w-full aspect-6/3 md:aspect-10/3 border-dashed center">
      <p>هیچ پرسش و پاسخی ثبت نشده است</p>
    </div>
  );
};

const ReplyCard = ({
  author: { name, role },
  content,
  status,
  createdAt,
}: Comment) => {
  return (
    <article className="flex flex-col gap-5 mt-2 ps-4">
      <div className="flex items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          {role === "admin" ? (
            <span className="block rounded-full bg-success px-3 py-0.5 text-gray-900 text-xs">
              پاسخ رسمی
            </span>
          ) : (
            <span className="bg-primary-25 rounded-full block p-2">
              پاسخ از
              <h6 className="font-semibold text-sm">{name}</h6>
            </span>
          )}

          {status === "pending" && (
            <span className="block rounded-full bg-warning px-3 py-0.5 text-gray-400">
              در انتظار برای تایید
            </span>
          )}
          <p>{content}</p>
        </div>
        <time className="text-xs">
          {fullDateNumberFormat(createdAt, "fa-ir")}
        </time>
      </div>
    </article>
  );
};

const QACard = ({
  author: { name },
  content,
  status,
  createdAt,
  replies,
}: QACommentWithReplies) => {
  return (
    <article className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h6 className="font-semibold text-sm">{name}</h6>
          {status === "pending" && (
            <span className="block rounded-full bg-warning px-3 py-0.5 text-gray-400">
              در انتظار برای تایید
            </span>
          )}
        </div>
        <time className="text-xs">
          {fullDateNumberFormat(createdAt, "fa-ir")}
        </time>
      </div>
      <p className="font-bold">{content}</p>

      {replies && replies.length > 0 && (
        <div className="mt-6">
          {replies.map((reply) => (
            <ReplyCard key={reply.id} {...reply} />
          ))}
        </div>
      )}
      <button
        type="button"
        className="text-secondary-500 flex gap-1.5 items-center w-fit mt-4"
      >
        ثبت پاسخ
        <Pen className="size-4" />
      </button>
      <SeparatorLine size="3" className="my-2" />
    </article>
  );
};

const QAList = () => {
  const { qaComments: qaCommentsPromise } = useProductPageContext();
  const qaComments = use(qaCommentsPromise);

  if (qaComments.length <= 0) {
    return <QAPlaceholder />;
  }

  return (
    <div className="flex flex-col gap-16">
      {qaComments.map((qa) => (
        <QACard key={qa.id} {...qa} />
      ))}
    </div>
  );
};

export default QAList;
