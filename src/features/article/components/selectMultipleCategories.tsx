import type { FC } from "react";

import { CheckIcon, ChevronsUpDownIcon, XIcon } from "lucide-react";
import { use } from "react";

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

import type { Category } from "../types";

export const SelectMultipleCategoriesSkeleton = () => {
  return <Skeleton className="h-9 border w-full" />;
};
const SelectMultipleCategories: FC<{
  categories: Promise<Category[]>;
  onSelect: (selected: { id: string; name: string }) => void;
  selectedItems: string[];
  triggerId?: string;
}> = ({
  categories: categoriesPromise,
  onSelect,
  selectedItems,
  triggerId = "customField",
}) => {
  const categories = use(categoriesPromise);
  if (!categories) return;
  const selectedGroups = categories.filter(({ id }) =>
    selectedItems.includes(id),
  );
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
              selectedGroups.map(({ name, id }) => {
                return (
                  <Badge className="rounded-sm" key={id} variant="outline">
                    {name}
                    <Button
                      asChild
                      size="icon"
                      className="size-4"
                      type="button"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect({ id, name });
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
              <span className="text-muted-foreground">انتخاب گروه ها</span>
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
          <CommandInput placeholder="جستجو فیلد سفارشی..." />
          <CommandList>
            <CommandEmpty>هیچ فیلد سفارشی پیدا نشد</CommandEmpty>
            <CommandGroup>
              {categories.map(({ id, name }) => (
                <CommandItem
                  key={id}
                  value={name}
                  onSelect={() => onSelect({ id, name })}
                >
                  <span className="truncate">{name}</span>
                  {selectedItems.includes(id) && (
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

export default SelectMultipleCategories;
