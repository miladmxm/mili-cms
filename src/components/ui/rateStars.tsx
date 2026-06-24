import type { CSSProperties } from "react";

import Image from "next/image";

import Star from "@/assets/icons/star.svg";
import stars from "@/assets/images/stars.png";
import starsOutline from "@/assets/images/starsOutline.png";
import { cn } from "@/lib/utils";

export const RateStarsInput = ({ className }: { className?: string }) => {
  return (
    <button type="button" className={cn("relative", className)}>
      <Star />
    </button>
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
