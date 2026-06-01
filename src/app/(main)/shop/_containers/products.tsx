import type { PropsWithChildren } from "react";

import type { Product } from "@/services/product/type";

import ProductCard, { ProductCardSkeleton } from "@/components/ui/productCard";

const ProductsContainer = ({ children }: PropsWithChildren) => {
  return (
    <section className="grid @min-2xl:grid-cols-2 @min-5xl:grid-cols-3 auto-rows-auto gap-4">
      {children}
    </section>
  );
};

export const ProductsSkeleton = () => {
  return (
    <ProductsContainer>
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </ProductsContainer>
  );
};

const Products = ({ products }: { products: Product[] }) => {
  return (
    <ProductsContainer>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </ProductsContainer>
  );
};

export default Products;
