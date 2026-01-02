import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dashboard/ui/dropdown-menu";
import { useDirection } from "@/hooks/useDirection";

const SelectParentCategory = ({
  value,
  onChange,
  allCategories,
}: {
  value?: string;
  onChange: (value: string) => void;
  allCategories: { name: string; id: string }[];
}) => {
  const dir = useDirection();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{}</DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="rtl:dir-rtl">
        <DropdownMenuLabel>انتخاب والد</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {allCategories.map(({ id, name }) => {
            return (
              <DropdownMenuRadioItem dir={dir} key={id} value={id}>
                {name}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SelectParentCategory;
