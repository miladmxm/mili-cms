import Categories from "@/features/products/components/categories";
import LowPrices from "@/features/products/components/lowPrices";
import SpecialOffers from "@/features/products/components/specialOffers";

export default async function Home() {
  return (
    <main>
      <Categories />
      <SpecialOffers />
      <LowPrices />
    </main>
  );
}
