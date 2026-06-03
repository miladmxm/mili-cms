"use client";

import type { Route } from "next";
import type { RefObject } from "react";

import { hover, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useEffectEvent, useRef, useState } from "react";

import type { Product } from "@/services/product/type";

import {
  DiscountedPrice,
  FormatedPrice,
} from "@/features/product/components/ui/finalPrice";
import {
  getMaxDiscount,
  haveDiscount,
} from "@/features/product/utils/calcDiscount";

import Button from "./button";
import DefaultImage from "./defaultImage";
import Skeleton from "./skeleton";

const ProductCardBackground = ({
  containerRef,
}: {
  containerRef: RefObject<HTMLElement | null>;
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const hoverEvent = useEffectEvent(() => {
    return hover(containerRef.current, () => {
      setIsHovered(true);
      return () => setIsHovered(false);
    });
  });
  useEffect(() => {
    hoverEvent();
  }, []);
  const duration = 0.9;
  const delay = isHovered ? 0.07 : 0;
  return (
    <motion.div
      animate={
        isHovered
          ? {
              boxShadow:
                " 0px 3px 3px 0px #0000001A, 0px 5px 2px -1px #0000001A",
            }
          : {}
      }
      className="bg-white absolute inset-x-0 overflow-hidden bottom-0 -z-10 product-card-shadow h-3/4 w-full rounded-7xl"
    >
      <motion.span
        animate={
          isHovered
            ? { scale: 1.4, opacity: 1 }
            : { scale: 0, opacity: 0, x: "100%", y: "100%" }
        }
        transition={{ type: "spring", duration }}
        className="rounded-full w-full opacity-0 z-0 aspect-square absolute bg-thready-500 -left-3 -top-3"
      />
      <motion.span
        animate={
          isHovered
            ? { scale: 1.3, opacity: 1 }
            : { scale: 0, opacity: 0, x: "100%", y: "100%" }
        }
        transition={{ type: "spring", duration, delay: delay * 1 }}
        className="rounded-full w-full opacity-0 z-10 aspect-square absolute bg-[#F2EDE8] left-1/5 top-1/5"
      />
      <motion.span
        animate={
          isHovered
            ? { scale: 1.3, opacity: 1 }
            : { scale: 0, opacity: 0, x: "100%", y: "100%" }
        }
        transition={{ type: "spring", duration, delay: delay * 3 }}
        className="rounded-full w-full opacity-0 z-10 aspect-square absolute bg-thready-200 left-2/5 top-2/5"
      />
      <motion.span
        animate={
          isHovered
            ? { scale: 1.3, opacity: 1 }
            : { scale: 0, opacity: 0, x: "100%", y: "100%" }
        }
        transition={{ type: "spring", duration, delay: delay * 3 }}
        className="rounded-full w-full opacity-0 z-10 aspect-square absolute bg-[#FCFAF9] left-3/5 top-3/5"
      />
      <motion.span
        animate={
          isHovered
            ? { scale: 1.3, opacity: 1 }
            : { scale: 0, opacity: 0, x: "100%", y: "100%" }
        }
        transition={{ type: "spring", duration, delay: delay * 4 }}
        className="rounded-full w-full opacity-0 z-10 aspect-square absolute bg-white left-4/5 top-4/5"
      />
    </motion.div>
  );
};

const Discount = ({ metadata }: { metadata: Product["metadata"] }) => {
  const discounted = haveDiscount(metadata);
  if (!discounted) return;
  const discount = getMaxDiscount(metadata);
  return (
    <div className="flex items-center justify-between gap-1">
      <small className="rounded-full text-xs text-white bg-thready-900 center px-2 py-1">
        {discount}%
      </small>
      <del className="font-bold text-lg text-primary-600 before:bg-primary-600 before:h-0.5 before:w-full before:absolute before:inset-s-0 before:top-[calc(50%-4px)] relative">
        <FormatedPrice metadata={metadata} />
      </del>
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="relative px-8 py-6 flex h-full flex-col gap-6">
      <Skeleton className="mx-auto rounded-6xl w-full aspect-300/214 object-cover" />
      <Skeleton className="absolute inset-x-0 bottom-0 -z-10 product-card-shadow h-3/4 w-full rounded-7xl" />
      <Skeleton className="w-1/3 h-4" />
      <div className="text-lg md:text-2xl font-bold text-primary-900 flex justify-between">
        <Skeleton className="w-1/6 h-6" />
        <Skeleton className="w-1/6 h-6" />
      </div>
      <Skeleton className="w-full h-12 rounded-full" />
    </div>
  );
};

const ProductCard = ({ thumbnail, name, metadata, slug }: Product) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const productLink: Route = `/product/${slug}`;
  return (
    <div
      ref={containerRef}
      className="relative px-8 py-6 flex h-full flex-col gap-6"
    >
      <Link href={productLink}>
        <DefaultImage
          className="mx-auto rounded-6xl aspect-300/214 object-cover"
          image={thumbnail}
        />
      </Link>
      <ProductCardBackground containerRef={containerRef} />
      <h4 className="text-primary-900 md:text-lg font-bold">
        <Link href={productLink}>{name}</Link>
      </h4>
      <Discount metadata={metadata} />
      <div className="text-lg md:text-2xl font-bold text-primary-900 flex justify-between">
        <strong>قیمت:</strong>
        <strong>
          <DiscountedPrice metadata={metadata} />
        </strong>
      </div>
      <Button href={productLink} variant="outline" className="mt-auto">
        خرید
      </Button>
    </div>
  );
};

export default ProductCard;
