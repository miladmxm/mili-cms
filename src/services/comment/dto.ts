import type { findAllCommentsWithRelations } from "@/repositories/comment.repo";

import type { CommentAdminAccess } from "./type";

export const DTOtoAdminAccessComment = (
  dbComments: Awaited<ReturnType<typeof findAllCommentsWithRelations>>,
): CommentAdminAccess[] => {
  const comments: CommentAdminAccess[] = [];

  for (const comment of dbComments) {
    const { article, product, ...more } = comment;
    comments.push({
      ...more,
      product: product?.product,
      article: article?.article,
    });
  }

  return comments;
};
