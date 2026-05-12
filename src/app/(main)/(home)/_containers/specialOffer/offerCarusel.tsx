import type { Product } from "@/services/product/type";

import Carusel, {
  CaruselContent,
  CaruselControllers,
} from "@/components/ui/carusel";
import ProductCard from "@/components/ui/productCard";

const OfferCarusel = ({ products }: { products: Product[] }) => {
  return (
    <div className="w-full @container">
      <Carusel>
        <CaruselContent>
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="flex-size-100 md:flex-size-65 lg:flex-size-45 xl:flex-size-33 p-4"
              >
                <ProductCard {...product} />
              </div>
            );
          })}
        </CaruselContent>
        <CaruselControllers />
      </Carusel>
    </div>
  );
};

export default OfferCarusel;
