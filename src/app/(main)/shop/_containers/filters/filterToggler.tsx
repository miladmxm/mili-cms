"use client";

import { setOpenFilter } from "./store";

const FilterToggler = () => {
  return (
    <button type="button" onClick={setOpenFilter}>
      فیلتر ها
    </button>
  );
};

export default FilterToggler;
