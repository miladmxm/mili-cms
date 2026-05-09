"use client";

import { motion, useAnimate } from "motion/react";
import Image from "next/image";
import { useEffect, useEffectEvent } from "react";

import HeroImage from "@/assets/images/heroSectionImage.png";

const HeroImageComponent = () => {
  const [scope, animate] = useAnimate();
  const startMotion = useEffectEvent(() => {
    animate([
      [
        scope.current,
        { x: ["50%", "50%"], y: ["10%", 0], opacity: [0, 1] },
        { type: "spring", damping: 12 },
      ],
      [scope.current, { x: 0 }, { type: "spring" }],
    ]);
  });
  useEffect(() => {
    startMotion();
  }, []);
  return (
    <motion.div ref={scope} className="w-1/2 ms-auto flex items-end">
      <Image
        src={HeroImage}
        className="size-full object-contain"
        alt="hero image"
      />
    </motion.div>
  );
};

export default HeroImageComponent;
