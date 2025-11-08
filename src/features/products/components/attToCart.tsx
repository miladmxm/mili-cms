"use client";

import { addToCart } from "../actions/addToCart";

const AddToCart = ({ id }: { id: number | string }) => {
  return (
    <button
      className="my-5 cursor-pointer text-blue-600 ring-1"
      type="button"
      onClick={() => addToCart(id)}
    >
      افزودن به سبد خرید
    </button>
  );
};

export default AddToCart;
