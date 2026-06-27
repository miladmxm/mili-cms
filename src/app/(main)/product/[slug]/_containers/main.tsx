import { redirect } from "next/navigation";

import FAQsection from "@/app/(main)/_containers/fag";
import {
  getApprovedProductComments,
  getApprovedProductQAwithReply,
  getPublicOptions,
  getPublishedProduct,
} from "@/features/product/dal/query";

import GallerySlider from "../_components/gallerySlider";
import ProductPageContextProvider from "../context";
import TabContentProvider from "../store/tabContent";
import Contents from "./contents";
import PriceAndAddToCart from "./priceAndAddToCart";
import Thumbnail from "./thumbnail";
import TopContents from "./topContents";

const Product = async ({ params }: PageProps<"/product/[slug]">) => {
  const { slug } = await params;
  const product = await getPublishedProduct(slug);
  const options = await getPublicOptions();

  if (!product) {
    redirect("/shop");
  }

  const productComments = getApprovedProductComments(product.id);
  const productQAComments = getApprovedProductQAwithReply(product.id);

  return (
    <ProductPageContextProvider
      comments={productComments}
      qaComments={productQAComments}
      product={product}
    >
      <section className="grid md:grid-cols-2 gap-8 container pb-8 pt-22">
        <GallerySlider gallery={product.gallery} />
        <TopContents {...product} options={options} />
      </section>
      <PriceAndAddToCart metadata={product.metadata} />
      <Thumbnail thumbnail={product.thumbnail || undefined} />
      <TabContentProvider>
        <Contents content={product.content} />
      </TabContentProvider>
      <FAQsection />
    </ProductPageContextProvider>
  );
};

export default Product;
