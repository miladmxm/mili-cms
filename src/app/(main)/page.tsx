import Categories from "@/features/products/components/categories";
import SpecialOffers from "@/features/products/components/specialOffers";

export default async function Home() {
  return (
    <main>
      <Categories />
      <SpecialOffers />
    </main>
  );
}
