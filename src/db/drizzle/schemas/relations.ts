import { relations } from "drizzle-orm";

import {
  article,
  articleToCategory,
  articleToComments,
  articleToRate,
} from "./article";
import { articleCategory } from "./articleCategory";
import { account, session, user } from "./auth";
import { comment } from "./comment";
import { media } from "./media";
import { rate } from "./rate";

export const articleToCategoryRelations = relations(
  articleToCategory,
  ({ one }) => ({
    article: one(article, {
      fields: [articleToCategory.articleId],
      references: [article.id],
    }),
    category: one(articleCategory, {
      fields: [articleToCategory.categoryId],
      references: [articleCategory.id],
    }),
  }),
);
export const articleToCommentRelations = relations(
  articleToComments,
  ({ one }) => ({
    article: one(article, {
      fields: [articleToComments.articleId],
      references: [article.id],
    }),
    comment: one(comment, {
      fields: [articleToComments.commentId],
      references: [comment.id],
    }),
  }),
);

export const articleToRateRelations = relations(articleToRate, ({ one }) => ({
  rate: one(rate, {
    fields: [articleToRate.rateId],
    references: [rate.id],
  }),
  article: one(article, {
    fields: [articleToRate.articleId],
    references: [article.id],
  }),
}));

export const articleRelations = relations(article, ({ many, one }) => ({
  thumbnail: one(media, {
    fields: [article.thumbnail],
    references: [media.id],
  }),
  author: one(user, {
    fields: [article.authorId],
    references: [user.id],
  }),
  comments: many(articleToComments),
  categories: many(articleToCategory),
  rates: many(articleToRate),
}));

export const categoryRelations = relations(
  articleCategory,
  ({ many, one }) => ({
    thumbnail: one(media, {
      fields: [articleCategory.thumbnail],
      references: [media.id],
    }),
    parent: one(articleCategory, {
      fields: [articleCategory.parentId],
      references: [articleCategory.id],
    }),
    articles: many(articleToCategory),
  }),
);

export const commentRelations = relations(comment, ({ one }) => ({
  parent: one(comment, {
    fields: [comment.parentId],
    references: [comment.id],
  }),
  author: one(user, {
    fields: [comment.authorId],
    references: [user.id],
  }),
  article: one(articleToComments, {
    fields: [comment.id],
    references: [articleToComments.commentId],
  }),
}));

export const rateRelations = relations(rate, ({ one }) => ({
  user: one(user, {
    fields: [rate.userId],
    references: [user.id],
  }),
  article: one(articleToRate, {
    fields: [rate.id],
    references: [articleToRate.rateId],
  }),
}));

// * Better auth relations

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  articles: many(article),
  comments: many(comment),
  rates: many(rate),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));
