import type { FC } from "react";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";

import type { Category } from "@/services/article/types";

import { Button } from "@/components/dashboard/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/dashboard/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/dashboard/ui/popover";
import { Skeleton } from "@/components/dashboard/ui/skeleton";

export const SelectCategorySkeleton = () => {
  return <Skeleton className="h-9 border w-full" />;
};
const SelectCategory: FC<{
  categories: Category[];
  onSelect: (selected: { id: string; name: string }) => void;
  selectedItemId?: string;
  triggerId?: string;
}> = ({ categories, onSelect, selectedItemId, triggerId = "customField" }) => {
  const selectedItem = categories.find(({ id }) => id === selectedItemId);
  const [open, setOpen] = useState(false);
  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          className="h-auto min-h-8 w-full justify-between hover:bg-transparent"
          id={triggerId}
          variant="outline"
          role="combobox"
        >
          <div className="flex flex-wrap items-center gap-1 pr-2.5">
            <span className="text-muted-foreground">
              {selectedItem ? selectedItem.name : "انتخاب گروه"}
            </span>
          </div>
          <ChevronsUpDownIcon
            aria-hidden="true"
            className="text-muted-foreground/80 shrink-0"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popper-anchor-width) p-0">
        <Command>
          <CommandInput placeholder="جستجو فیلد سفارشی..." />
          <CommandList>
            <CommandEmpty>هیچ فیلد سفارشی پیدا نشد</CommandEmpty>
            <CommandGroup>
              {categories.map(({ id, name }) => (
                <CommandItem
                  key={id}
                  value={name}
                  onSelect={() => {
                    onSelect({ id, name });
                    setOpen(false);
                  }}
                >
                  <span className="truncate">{name}</span>
                  {selectedItemId === id && (
                    <CheckIcon size={16} className="ml-auto" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectCategory;
