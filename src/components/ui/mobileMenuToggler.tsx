import type { ComponentProps } from "react";

import { setOpen } from "@/app/(main)/_containers/header/mobileMenu/store";
import HamburgerMenu from "@/assets/icons/hamburgerMenu.svg";
import { cn } from "@/lib/utils";

const MobileMenuToggler = ({
  className,
  ...props
}: ComponentProps<"button">) => {
  return (
    <button
      type="button"
      onClick={setOpen}
      className={cn("*:size-6 text-primary-900", className)}
      {...props}
    >
      <HamburgerMenu />
    </button>
  );
};

export default MobileMenuToggler;
