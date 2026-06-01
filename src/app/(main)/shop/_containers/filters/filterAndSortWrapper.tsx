import FilterResult from "./filterResult";
import FilterToggler from "./filterToggler";
import Sort from "./sort";

const FilterAndSort = () => {
  return (
    <div className="flex justify-between items-center gap-4 py-6">
      <div className="flex md:flex-row flex-col gap-4 md:items-center flex-auto max-w-full">
        <FilterToggler />
        <FilterResult />
      </div>
      <Sort />
    </div>
  );
};

export default FilterAndSort;
