import { redirect } from "next/navigation";

import { getPublishedProduct } from "@/features/product/dal/query";

import GallerySlider from "../_components/gallerySlider";
import TopContents from "./topContents";

const MainContent = async ({
  params,
  searchParams,
}: PageProps<"/product/[slug]">) => {
  const { slug } = await params;
  const product = await getPublishedProduct(slug);

  if (!product) {
    redirect("/shop");
  }

  return (
    <section className="grid md:grid-cols-2 gap-8 container pb-8 pt-22">
      <GallerySlider gallery={product.gallery} />
      <TopContents {...product} />
    </section>
  );
};

export default MainContent;
