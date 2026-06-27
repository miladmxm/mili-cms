"use client";

import type { CSSProperties } from "react";

import Image from "next/image";

import Star from "@/assets/icons/star.svg";
import stars from "@/assets/images/stars.png";
import starsOutline from "@/assets/images/starsOutline.png";
import { cn } from "@/lib/utils";

const ArrayStar = Array.from({ length: 5 }, (_, i) => i + 1);

export const RateStarsInput = ({
  onChange,
  value,
  className,
}: {
  className?: string;
  onChange: (rating: number) => void;
  value?: number;
}) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {ArrayStar.map((star) => (
        <label
          className="cursor-pointer "
          key={star}
          htmlFor={`star-${star}`}
          id={`star-${star}-label`}
        >
          <input
            type="radio"
            name="rating"
            id={`star-${star}`}
            value={star}
            className="sr-only peer"
            checked={value === star}
            onChange={() => onChange?.(star)}
          />
          <Star
            className={cn(
              "md:size-5 size-6 *:transition-all [&_path]:stroke-[#FFD738] [&_path]:fill-transparent peer-checked:[&_path]:fill-[#FFD738]",
              {
                "[&_path]:fill-[#FFD738]": value && value >= star,
              },
            )}
            key={star}
          />
        </label>
      ))}
    </div>
  );
};

const RateStars = ({
  rate,
  className,
}: {
  rate: number;
  className?: string;
}) => {
  const validatedRate = rate > 100 ? 100 : rate < 0 ? 0 : rate;
  return (
    <div className={cn("relative", className)}>
      <Image
        style={{ "--rate-number": validatedRate } as CSSProperties}
        src={stars}
        alt="stars"
        className="clip-path-inset-e-[var(--rate-number)]"
      />
      <Image src={starsOutline} className="inset-0 absolute" alt="stars" />
    </div>
  );
};

export default RateStars;
