import ProductCard from "@/components/ui/productCard";
import { getPublishedProducts } from "@/features/product/dal/query";

const Products = async () => {
  const products = await getPublishedProducts({ limit: 12, offset: 0 });
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default Products;
