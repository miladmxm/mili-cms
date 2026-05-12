"use client";

import type { RefObject } from "react";

import { hover, motion } from "motion/react";
import { useEffect, useEffectEvent, useRef, useState } from "react";

import type { Product } from "@/services/product/type";

import { formatNumber } from "@/lib/formatNumber";

import Button from "./button";
import DefaultImage from "./defaultImage";

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

const ProductCard = ({ thumbnail, name, metadata }: Product) => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={containerRef}
      className="relative px-8 py-6 flex h-full flex-col gap-6"
    >
      <DefaultImage
        className=" mx-auto rounded-6xl aspect-[300/214] object-cover"
        image={thumbnail}
      />
      <ProductCardBackground containerRef={containerRef} />
      <h4 className="text-primary-900 md:text-lg font-bold">{name}</h4>
      <div className="flex items-center justify-between gap-1">
        <small className="rounded-full text-xs text-white bg-thready-900 center px-2 py-1">
          {metadata[0].discount}%
        </small>
        <del className="font-bold text-lg text-primary-600 before:bg-primary-600 before:h-0.5 before:w-full before:absolute before:start-0 before:top-[calc(50%-2px)] relative">
          {formatNumber(metadata[0].price)}
        </del>
      </div>
      <div className="text-2xl font-bold text-primary-900 flex justify-between">
        <strong>قیمت:</strong>
        <strong>
          {formatNumber(
            (metadata[0].price / 100) * (100 - metadata[0].discount),
          )}
        </strong>
      </div>
      <Button variant="outline">خرید</Button>
    </div>
  );
};

export default ProductCard;
