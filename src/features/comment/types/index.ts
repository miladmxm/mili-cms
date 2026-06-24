import type { CommentStatus, CommentType } from "@/services/comment/type";

export const StatusDictionary: Record<CommentStatus, string> = {
  approved: "تایید شده",
  pending: "در انتظار",
  spam: "هرزنامه",
};

export const CommentTypeDictionary: Record<CommentType, string> = {
  default: "نظر",
  qa: "پرسش و پاسخ",
};
