import type { Option, OptionItem } from "@/services/product/type";

import Radio from "@/components/ui/radio";
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
    <li>
      <Radio
        className="flex gap-2 text-sm"
        id={key}
        checked={isChecked}
        name={optionSlug}
        onChange={(e) => {
          if (e.target.checked) {
            applyParams({ [optionSlug]: value }, { scroll: false });
          }
        }}
      >
        <label className="cursor-pointer" htmlFor={key}>
          {label}
        </label>
      </Radio>
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
