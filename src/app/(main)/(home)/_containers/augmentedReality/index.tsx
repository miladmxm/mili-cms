"use client";

import type { CSSProperties } from "react";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import augmentedRealityImage from "@/assets/images/augmentedReality.jpg";
import AugmentedRealityWire from "@/assets/images/augmentedReality.svg?url";
import SectionCurveOutside from "@/components/ui/sectionCurveOutside";

const AugmentedReality = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const x = useMotionValue<number>(0);
  const y = useMotionValue<number>(0);
  const xypx = useMotionTemplate`${x}px ${y}px`;
  return (
    <motion.section
      onPointerMove={(e) => {
        if (sectionRef.current) {
          const { top } = sectionRef.current.getBoundingClientRect();

          x.set(e.clientX - 150);
          y.set(e.clientY - top - 150);
        }
      }}
      style={
        {
          "--mask-position": xypx,
        } as CSSProperties
      }
      ref={sectionRef}
      className="w-full relative my-28 md:my-52"
    >
      <SectionCurveOutside />
      <SectionCurveOutside position="bottom" />
      <Image
        src={augmentedRealityImage}
        className="size-full mask-img object-contain object-bottom-left"
        alt="Augmented reality"
      />
      <Image
        src={augmentedRealityImage}
        className="absolute left-0 bottom-0  opacity-10 size-full -z-10 object-contain object-bottom-left"
        alt="Augmented reality"
      />
      <Image
        className="object-contain object-bottom-left absolute left-0 bottom-0 size-full"
        src={AugmentedRealityWire}
        alt="wire"
      />
    </motion.section>
  );
};

export default AugmentedReality;
