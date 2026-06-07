import { redirect } from "next/navigation";

import FAQsection from "@/app/(main)/_containers/fag";
import {
  getPublicOptions,
  getPublishedProduct,
} from "@/features/product/dal/query";

import GallerySlider from "../_components/gallerySlider";
import Contents from "./contents";
import PriceAndAddToCart from "./priceAndAddToCart";
import Thumbnail from "./thumbnail";
import TopContents from "./topContents";

const Product = async ({
  params,
  searchParams,
}: PageProps<"/product/[slug]">) => {
  const { slug } = await params;
  const product = await getPublishedProduct(slug);

  const options = await getPublicOptions();

  if (!product) {
    redirect("/shop");
  }

  return (
    <>
      <section className="grid md:grid-cols-2 gap-8 container pb-8 pt-22">
        <GallerySlider gallery={product.gallery} />
        <TopContents {...product} options={options} />
      </section>
      <PriceAndAddToCart metadata={product.metadata} />
      <Thumbnail thumbnail={product.thumbnail || undefined} />
      <Contents content={product.content} />
      <FAQsection />
    </>
  );
};

export default Product;
