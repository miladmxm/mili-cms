"use client";

import { useAnimate } from "motion/react";
import { useEffect, useEffectEvent } from "react";

import Button from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroTextContent = () => {
  const isMobile = useIsMobile();
  const [scope, animate] = useAnimate();
  const motion = useEffectEvent(() => {
    animate(
      "h1",
      { x: [100, 0], opacity: [0, 1] },
      { duration: 0.6, delay: isMobile ? 0 : 1, type: "spring" },
    );
    animate(
      "p",
      { x: [100, 0], opacity: [0, 1] },
      { duration: 0.6, delay: isMobile ? 0.1 : 1.1, type: "spring" },
    );
    animate(
      "div",
      { x: [100, 0], opacity: [0, 1] },
      { duration: 0.6, delay: isMobile ? 0.2 : 1.2, type: "spring" },
    );
  });
  useEffect(() => {
    motion();
  }, [animate]);
  return (
    <div
      ref={scope}
      className="w-full md:w-max flex flex-col gap-6 *:opacity-0"
    >
      <h1 className="font-black text-4xl md:text-5xl text-gray-500 leading-[160%]">
        یاتاک <br /> رویای شیرین <br /> خوابی آرام
      </h1>
      <p className="text-2xl md:text-3xl font-light text-gray-500">
        سرویس خواب مینیمال
      </p>
      <div>
        <Button
          shadow="sm"
          className="max-w-full max-md:w-1/2 max-md:min-w-max"
          variant="secondary"
        >
          خرید
        </Button>
      </div>
    </div>
  );
};

export default HeroTextContent;
