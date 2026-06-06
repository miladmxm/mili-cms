import type { Option, OptionItem } from "@/services/product/type";

const Options = ({
  optionItems,
  options,
}: {
  optionItems: OptionItem[];
  options: Option[];
}) => {
  return (
    <div className="grid auto-cols-fr">
      {optionItems.map(({ optionId, label, id }) => (
        <div key={id}>{label}</div>
      ))}
    </div>
  );
};

export default Options;
