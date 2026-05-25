interface Filter {
  title: string;
  amount: string;
}

const FilterPriceItem = ({ amount, title }: Filter) => {
  return (
    <button
      onClick={() => {
        console.log(amount);
      }}
      className="py-3 px-3 rounded-full text-center bg-primary-25 text-sm"
      type="button"
    >
      {title}
    </button>
  );
};

const FILTERS: Filter[] = [
  { title: "تا ۲۰ میلیون", amount: "0-20" },
  {
    amount: "20-40",
    title: "۲۰ تا ۴۰ میلیون",
  },
  { title: "۴۰ تا ۶۰ میلیون", amount: "40-60" },
  { title: "۶۰ تا ۸۰ میلیون", amount: "60-80" },
];

const FilterPriceItems = () => {
  return (
    <div className="grid grid-cols-2 auto-rows-auto gap-2">
      {FILTERS.map((filterItem) => (
        <FilterPriceItem key={filterItem.amount} {...filterItem} />
      ))}
    </div>
  );
};

const FilterByPrice = () => {
  return (
    <div className="bg-white rounded-4xl px-6 pb-8 mt-6">
      <div className="center w-full bg-primary-200 py-2 -translate-y-1/2 rounded-full">
        فیلتر بر اساس قیمت
      </div>
      <FilterPriceItems />
    </div>
  );
};

export default FilterByPrice;
