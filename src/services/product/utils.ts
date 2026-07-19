export const discountCalculation = ({
  discount,
  price,
}: {
  price: number;
  discount: number;
}) => (price / 100) * (100 - discount);
