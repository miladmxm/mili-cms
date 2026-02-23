import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

import type { Media } from "@/services/media/type";

import { LoadMediaOffset } from "@/constant/dashboard";

export const useInfinityScroll = (mediaData: Media[]) => {
  const [isLoadEnded, setIsLoadEnded] = useState<boolean>(
    LoadMediaOffset > mediaData.length,
  );
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isBottom = () => {
    if (wrapperRef.current === null) return false;
    return (
      wrapperRef.current?.getBoundingClientRect().bottom <= window.innerHeight
    );
  };
  const lastLength = useRef<number>(mediaData.length);
  const searchParams = useSearchParams();
  const handleScroll = () => {
    if (isBottom() && !isLoadEnded) {
      const page = parseInt(searchParams.get("page") || "1", 10);
      if (
        lastLength.current > mediaData.length ||
        page * LoadMediaOffset > mediaData.length
      ) {
        setIsLoadEnded(true);
        return;
      }
      router.push(`?page=${page + 1}`, { scroll: false });
      lastLength.current = page * LoadMediaOffset;
    }
  };

  return { handleScroll, wrapperRef, isLoadEnded };
};
