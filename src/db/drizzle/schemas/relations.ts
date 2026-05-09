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
import {
  product,
  productGallery,
  productMeta,
  productToCategory,
  productToComments,
  productToOptionItem,
  productToRate,
} from "./product";
import { productCategory } from "./productCategory";
import { productOption, productOptionItem } from "./productOptions";
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

export const productToCategoryRelations = relations(
  productToCategory,
  ({ one }) => ({
    product: one(product, {
      fields: [productToCategory.productId],
      references: [product.id],
    }),
    category: one(productCategory, {
      fields: [productToCategory.categoryId],
      references: [productCategory.id],
    }),
  }),
);

export const productToCommentRelations = relations(
  productToComments,
  ({ one }) => ({
    product: one(product, {
      fields: [productToComments.productId],
      references: [product.id],
    }),
    comment: one(comment, {
      fields: [productToComments.commentId],
      references: [comment.id],
    }),
  }),
);

export const productToRateRelations = relations(productToRate, ({ one }) => ({
  rate: one(rate, {
    fields: [productToRate.rateId],
    references: [rate.id],
  }),
  product: one(product, {
    fields: [productToRate.productId],
    references: [product.id],
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

export const productRelations = relations(product, ({ many, one }) => ({
  thumbnail: one(media, {
    fields: [product.thumbnailId],
    references: [media.id],
  }),
  author: one(user, {
    fields: [product.authorId],
    references: [user.id],
  }),
  comments: many(productToComments),
  categories: many(productToCategory),
  rates: many(productToRate),
  gallery: many(productGallery),
  optionItems: many(productToOptionItem),
  metadata: many(productMeta),
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

export const productCategoryRelations = relations(
  productCategory,
  ({ many, one }) => ({
    thumbnail: one(media, {
      fields: [productCategory.thumbnailId],
      references: [media.id],
    }),
    vector: one(media, {
      fields: [productCategory.vectorId],
      references: [media.id],
    }),
    parent: one(productCategory, {
      fields: [productCategory.parentId],
      references: [productCategory.id],
    }),
    product: many(productToCategory),
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
  product: one(productToComments, {
    fields: [comment.id],
    references: [productToComments.commentId],
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
  product: one(productToRate, {
    fields: [rate.id],
    references: [productToRate.productId],
  }),
}));

export const productGalleryRelation = relations(productGallery, ({ one }) => ({
  product: one(product, {
    fields: [productGallery.productId],
    references: [product.id],
  }),
  media: one(media, {
    fields: [productGallery.mediaId],
    references: [media.id],
  }),
}));

export const productOptionRelation = relations(productOption, ({ many }) => ({
  items: many(productOptionItem),
}));

export const productOptionItemRelation = relations(
  productOptionItem,
  ({ one }) => ({
    option: one(productOption, {
      fields: [productOptionItem.optionId],
      references: [productOption.id],
    }),
  }),
);

export const productToOptionItemRelation = relations(
  productToOptionItem,
  ({ one }) => ({
    optionItem: one(productOptionItem, {
      fields: [productToOptionItem.optionItemId],
      references: [productOptionItem.id],
    }),
    product: one(product, {
      fields: [productToOptionItem.productId],
      references: [product.id],
    }),
  }),
);

export const productMetaRelation = relations(productMeta, ({ one }) => ({
  product: one(product, {
    fields: [productMeta.productId],
    references: [product.id],
  }),
  thumbnail: one(media, {
    fields: [productMeta.thumbnailId],
    references: [media.id],
  }),
}));
// * Better auth relations

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  articles: many(article),
  comments: many(comment),
  rates: many(rate),
  product: many(product),
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
