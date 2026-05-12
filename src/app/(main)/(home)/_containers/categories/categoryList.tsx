"use client";

import { motion } from "motion/react";
import Link from "next/link";

import type { Category } from "@/services/product/type";

import { useMainLayoutContext } from "@/app/(main)/_context";
import DefaultImage from "@/components/ui/defaultImage";

const CategoryCard = ({ slug, vector, name }: Category) => {
  return (
    <Link href={`#${slug}`}>
      <motion.div
        whileHover={{
          backgroundImage:
            "radial-gradient(50% 50% at 50% 50%, #F8F7F7 53.37%, #DBD7D6 100%)",
          y: 20,
        }}
        transition={{ y: { type: "spring" } }}
        className="rounded-3xl md:rounded-7xl center flex-col gap-4 home-category-card p-2 md:p-4 xl:aspect-square max-xl:h-full bg-white"
      >
        <DefaultImage
          width={100}
          height={100}
          className="w-7/12 "
          image={vector}
        />
        <h4 className="text-sm md:text-xl text-center">{name}</h4>
      </motion.div>
    </Link>
  );
};

const CategoryList = () => {
  const { productCategories } = useMainLayoutContext();
  return (
    <div className=" mx-auto w-11/12 xl:w-10/12 gap-5 grid lg:grid-cols-6 grid-cols-3">
      {productCategories.map((category) => (
        <CategoryCard key={category.id} {...category} />
      ))}
    </div>
  );
};

export default CategoryList;
