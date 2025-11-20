import { relations } from "drizzle-orm";

import {
  article,
  articleCategory,
  articleComments,
  articleRate,
} from "./article";
import { user } from "./auth";
import { category } from "./category";
import { comment } from "./comment";
import { media } from "./media";
import { rate } from "./rate";

export const articleToCategoryRelations = relations(
  articleCategory,
  ({ one }) => ({
    article: one(article, {
      fields: [articleCategory.articleId],
      references: [article.id],
    }),
    category: one(category, {
      fields: [articleCategory.categoryId],
      references: [category.id],
    }),
  }),
);
export const articleToCommentRelations = relations(
  articleComments,
  ({ one }) => ({
    article: one(article, {
      fields: [articleComments.articleId],
      references: [article.id],
    }),
    comment: one(comment, {
      fields: [articleComments.commentId],
      references: [comment.id],
    }),
  }),
);

export const articleToRateRelations = relations(articleRate, ({ one }) => ({
  rate: one(rate, {
    fields: [articleRate.rateId],
    references: [rate.id],
  }),
  article: one(article, {
    fields: [articleRate.articleId],
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
  comments: many(articleComments),
  categories: many(articleCategory),
  rates: many(articleRate),
}));

export const userRelations = relations(user, ({ many }) => ({
  articles: many(article),
  comments: many(comment),
  rates: many(rate),
}));

export const categoryRelations = relations(category, ({ many, one }) => ({
  thumbnail: one(media, {
    fields: [category.thumbnail],
    references: [media.id],
  }),
  parent: one(category, {
    fields: [category.parentId],
    references: [category.id],
  }),
  articles: many(articleCategory),
}));

export const commentRelations = relations(comment, ({ one }) => ({
  parent: one(comment, {
    fields: [comment.parentId],
    references: [comment.id],
  }),
  author: one(user, {
    fields: [comment.authorId],
    references: [user.id],
  }),
  article: one(articleComments, {
    fields: [comment.id],
    references: [articleComments.commentId],
  }),
}));

export const rateRelations = relations(rate, ({ one }) => ({
  user: one(user, {
    fields: [rate.userId],
    references: [user.id],
  }),
  article: one(articleRate, {
    fields: [rate.id],
    references: [articleRate.rateId],
  }),
}));
