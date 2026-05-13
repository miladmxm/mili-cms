"use client";

import type { CSSProperties, PropsWithChildren } from "react";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import augmentedRealityImage from "@/assets/images/augmentedReality.jpg";
import AugmentedRealityWire from "@/assets/images/augmentedReality.svg?url";
import SectionCurveOutside from "@/components/ui/sectionCurveOutside";

const ARbackground = ({ children }: PropsWithChildren) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue<number>(0);
  const y = useMotionValue<number>(0);
  const xypx = useMotionTemplate`${x}px ${y}px`;
  return (
    <motion.div
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
      className="w-full relative max-h-screen"
    >
      <SectionCurveOutside />
      <SectionCurveOutside position="bottom" />
      <Image
        src={augmentedRealityImage}
        className="w-full h-full mask-img object-cover relative max-h-screen z-10 object-bottom-left"
        alt="Augmented reality"
      />
      <Image
        src={augmentedRealityImage}
        className="absolute left-0 bottom-0 opacity-10 size-full -z-10 object-cover object-bottom-left"
        alt="Augmented reality"
      />
      <Image
        className="object-cover object-bottom-left absolute left-0 bottom-0 size-full"
        src={AugmentedRealityWire}
        alt="wire"
      />
      <div className="z-20 inset-0 absolute">{children}</div>
    </motion.div>
  );
};

export default ARbackground;
