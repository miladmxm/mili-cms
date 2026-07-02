import { redirect } from "next/navigation";

import FAQsection from "@/app/(main)/_containers/fag";
import {
  getApprovedProductComments,
  getApprovedProductQAwithReply,
  getPublishedProduct,
} from "@/features/product/dal/query";

import GallerySlider from "../_components/gallerySlider";
import ProductPageContextProvider from "../_context";
import TabContentProvider from "../_store/tabStore";
import SelectVariableProvider from "../_store/variableSelectionStore";
import Contents from "./contents";
import PriceAndAddToCart from "./priceAndAddToCart";
import Thumbnail from "./thumbnail";
import TopContents from "./topContents";

const Product = async ({ params }: PageProps<"/product/[slug]">) => {
  const { slug } = await params;
  const product = await getPublishedProduct(slug);

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
      <SelectVariableProvider>
        <section className="grid md:grid-cols-2 gap-8 container py-8 md:pb-8 md:pt-22">
          <GallerySlider gallery={product.gallery} />
          <TopContents {...product} />
        </section>
        <PriceAndAddToCart />
      </SelectVariableProvider>
      <Thumbnail thumbnail={product.thumbnail || undefined} />
      <TabContentProvider>
        <Contents content={product.content} />
      </TabContentProvider>
      <FAQsection />
    </ProductPageContextProvider>
  );
};

export default Product;
