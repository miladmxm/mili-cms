import { Suspense } from "react";

import PostsCarousel from "@/features/posts/components/postsCarousel";
import Categories from "@/features/products/components/categories";
import LowPrices from "@/features/products/components/lowPrices";
import NewProducts from "@/features/products/components/newProducts";
import Reviews from "@/features/products/components/reviews";
import SpecialOffers from "@/features/products/components/specialOffers";

export default async function Home() {
  return (
    <main>
      <Suspense fallback="spesial loading...">
        <SpecialOffers />
      </Suspense>
      <Suspense fallback="loading...">
        <Categories />
        <LowPrices />
        <Reviews />
        <NewProducts />
        <PostsCarousel />
      </Suspense>
    </main>
  );
}
