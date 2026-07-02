"use client";

import { use } from "react";

import RateStars from "@/components/ui/rateStars";

import { useProductPageContext } from "../_context";

const RateReviews = () => {
  const { comments: commentsPromise } = useProductPageContext();
  const comments = use(commentsPromise);
  if (comments.length === 0) return null;
  const rate = comments.reduce((acc, curr) => {
    if (curr.rate) return [...acc, curr.rate];
    return acc;
  }, [] as number[]);
  const average = rate.reduce((acc, curr) => acc + curr, 0) / rate.length;
  const ratePercentage = 100 - (100 / 5) * average;
  return <RateStars rate={ratePercentage} className="w-44" />;
};

export default RateReviews;
