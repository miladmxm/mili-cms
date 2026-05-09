"use client";

import { useAnimate } from "motion/react";
import Image from "next/image";
import { useEffect, useEffectEvent } from "react";

import Feather from "@/assets/images/heroFeather.png";
import HeroImage from "@/assets/images/heroSectionImage.png";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroImageComponent = () => {
  const [scope, animate] = useAnimate();
  const isMobile = useIsMobile();
  const startMotion = useEffectEvent(() => {
    animate([
      [
        scope.current,
        { x: isMobile ? 0 : ["50%", "50%"], y: ["10%", 0], opacity: [0, 1] },
        { type: "spring", damping: 12 },
      ],
      [scope.current, { x: 0 }, { type: "spring", damping: 14 }],
      [
        ".first-feather",
        { opacity: [0, 0.4], rotate: ["10deg", "-10deg"], y: [-30, 0] },
        { type: "spring", duration: 1 },
      ],
    ]);
  });
  useEffect(() => {
    startMotion();
  }, []);
  return (
    <div
      ref={scope}
      className="md:w-1/2 opacity-0 ms-auto flex justify-center items-end relative"
    >
      <Image
        src={Feather}
        alt="Feather"
        className="absolute first-feather object-contain start-0 md:-start-[10%] size-24 md:size-28 opacity-0 bottom-44 rotate-180 -scale-y-90"
      />
      <Image
        src={HeroImage}
        className="md:size-full w-10/12 object-contain"
        alt="hero image"
      />
      <Image
        src={Feather}
        alt="Feather"
        className="absolute first-feather object-contain end-0 md:-end-[5%] size-28 md:size-32 opacity-0 max-md:-translate-y-full top-0 md:-top-22"
      />
    </div>
  );
};

export default HeroImageComponent;
