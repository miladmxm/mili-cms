import * as motion from "motion/react-client";

import type { Option, OptionItem } from "@/services/product/type";

import { useSetParams } from "@/hooks/useSetParams";

const FilterOptionItem = ({
  label,
  value,
  optionSlug,
}: OptionItem & { optionSlug: string }) => {
  const { applyParams, searchParams } = useSetParams();
  const key = `${optionSlug}-${value}`;
  const isChecked = searchParams.get(optionSlug) === value;
  return (
    <li className="flex gap-2 text-sm">
      <input
        className="sr-only"
        type="radio"
        id={key}
        checked={isChecked}
        name={optionSlug}
        onChange={(e) => {
          if (e.target.checked) {
            applyParams({ [optionSlug]: value }, { scroll: false });
          }
        }}
      />
      <label
        className="size-4 rounded-full bg-white border cursor-pointer border-primary-500 center p-0.5"
        htmlFor={key}
      >
        {" "}
        <motion.span
          animate={{ height: isChecked ? "100%" : "0" }}
          className="block aspect-square rounded-full bg-secondary-500"
        />
      </label>
      <label className="cursor-pointer" htmlFor={key}>
        {label}
      </label>
    </li>
  );
};

const FilterOptionItems = ({
  optionItems,
  optionSlug,
}: {
  optionItems: OptionItem[];
  optionSlug: string;
}) => {
  return (
    <ul className="grid grid-cols-2 auto-rows-auto gap-x-2 gap-y-4">
      {optionItems.map((item) => (
        <FilterOptionItem key={item.id} {...item} optionSlug={optionSlug} />
      ))}
    </ul>
  );
};

const FilterOptions = ({ options }: { options: Option[] }) => {
  return (
    <>
      {options.map(({ name, slug, items }) => (
        <fieldset
          key={slug}
          className="border border-primary-50 my-2 rounded-2xl px-4 pb-4 py-2"
        >
          <legend className="mx-auto px-2 text-thready-800">{name}</legend>
          <FilterOptionItems optionItems={items} optionSlug={slug} />
        </fieldset>
      ))}
    </>
  );
};

const FilterByOptions = ({ options }: { options: Option[] }) => {
  return (
    <div className="bg-white rounded-4xl px-6 pb-8 mt-6">
      <div className="center w-full bg-primary-200 py-2 -translate-y-1/2 rounded-full">
        فیلتر بر اساس ویژگی
      </div>
      <FilterOptions options={options} />
    </div>
  );
};

export default FilterByOptions;
