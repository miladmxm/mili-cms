import type { ComponentProps } from "react";

import Search from "@/assets/icons/search.svg";
import { cn } from "@/lib/utils";

const SearchBoxToggler = ({
  className,
  ...props
}: ComponentProps<"button">) => {
  return (
    <button
      type="button"
      className={cn("*:size-4 md:*:size-8 text-primary-900", className)}
      {...props}
    >
      <Search />
    </button>
  );
};

export default SearchBoxToggler;
