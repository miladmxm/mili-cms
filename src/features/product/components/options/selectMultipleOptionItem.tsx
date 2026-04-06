import type { FC } from "react";

import { CheckIcon, ChevronsUpDownIcon, XIcon } from "lucide-react";

import type { Option } from "@/services/product/type";

import { Badge } from "@/components/dashboard/ui/badge";
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

export const SelectMultipleCategoriesSkeleton = () => {
  return <Skeleton className="h-9 border w-full" />;
};
const SelectMultipleOptionItem: FC<{
  options: Option[];
  onSelect: (selected: { id: string; value: string; optionId: string }) => void;
  selectedItems: string[];
  triggerId?: string;
}> = ({ options, onSelect, selectedItems, triggerId = "customField" }) => {
  const selectedOptionItems = options
    .flatMap(({ items, id }) =>
      items.map((item) => ({ ...item, optionId: id })),
    )
    .filter(({ id }) => selectedItems.includes(id));
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="h-auto min-h-8 w-full justify-between hover:bg-transparent"
          id={triggerId}
          variant="outline"
          role="combobox"
        >
          <div className="flex flex-wrap items-center gap-1 pr-2.5">
            {selectedItems.length > 0 ? (
              selectedOptionItems.map(({ id, label, value, optionId }) => {
                return (
                  <Badge className="rounded-sm" key={id} variant="outline">
                    {label}
                    <Button
                      asChild
                      size="icon"
                      className="size-4"
                      type="button"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect({ id, optionId, value });
                      }}
                    >
                      <span>
                        <XIcon className="size-3" />
                      </span>
                    </Button>
                  </Badge>
                );
              })
            ) : (
              <span className="text-muted-foreground">انتخاب ویژگی ها</span>
            )}
          </div>
          <ChevronsUpDownIcon
            aria-hidden="true"
            className="text-muted-foreground/80 shrink-0"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popper-anchor-width) p-0">
        <Command>
          <CommandInput placeholder="جستجو ویژگی..." />
          <CommandList>
            <CommandEmpty>هیچ ویژگی ای پیدا نشد</CommandEmpty>
            {options.map(({ id: optionId, name, items }) => (
              <CommandGroup key={optionId}>
                <div className="border rounded-md">
                  <small className="text-sm font-semibold py-0.5 text-accent-foreground/50 ps-1.5">
                    {name}
                  </small>
                  {items.map(({ id, label, value }) => (
                    <CommandItem
                      className="ps-4"
                      key={id}
                      value={value}
                      keywords={[value, label]}
                      onSelect={() => onSelect({ id, value, optionId })}
                    >
                      <span className="truncate">{label}</span>
                      {selectedItems.includes(id) && (
                        <CheckIcon size={16} className="ml-auto" />
                      )}
                    </CommandItem>
                  ))}
                </div>
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default SelectMultipleOptionItem;
