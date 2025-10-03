import { getAllDicountProducts } from "../dal/queries";

const SpecialOffers = async () => {
  const products = await getAllDicountProducts();
  if (!products.success) return null;
  return (
    <div>
      {products.data.map((prod) => {
        return (
          <div key={prod.id}>
            {prod.name}
            <br />
            <span>{prod.prices.regular_price}</span>
            <br />
            <span>{prod.prices.price}</span>
            <span>{prod.prices.currency_symbol}</span>
          </div>
        );
      })}
    </div>
  );
};

export default SpecialOffers;
