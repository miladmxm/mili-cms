import AddToCart from "../_components/addToCart";
import CounterHandler from "../_components/counterHandler";
import Price from "../_components/price";
import Stock from "../_components/stock";
import { QuantityProvider } from "../_store/quantityStore";

const PriceAndAddToCart = () => {
  return (
    <QuantityProvider>
      <section className="container md:ps-12 relative">
        <div className="bg-primary-200 rounded-7xl md:rounded-full py-8 px-6 size-full ms-auto before:bg-primary-50 before:absolute before:w-44 before:inset-y-0 before:rounded-full before:inset-s-0 before:-z-10 flex max-md:flex-col items-center gap-6">
          <Price className="flex-auto" />
          <div className="flex items-center justify-between gap-2 max-md:flex-row-reverse">
            <CounterHandler />
            <Stock />
          </div>
          <AddToCart />
        </div>
      </section>
    </QuantityProvider>
  );
};

export default PriceAndAddToCart;
