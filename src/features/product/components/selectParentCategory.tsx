import type { FC, PropsWithChildren } from "react";

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

const SelectParentCategory: FC<
  PropsWithChildren & {
    value?: string;
    onChange: (value: string) => void;
    allCategories: { name: string; id: string }[];
  }
> = ({ value, onChange, allCategories, children }) => {
  const dir = useDirection();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="rtl:dir-rtl">
        <DropdownMenuLabel>انتخاب والد</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          <DropdownMenuRadioItem dir={dir} value="">
            هیج کدام
          </DropdownMenuRadioItem>
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
