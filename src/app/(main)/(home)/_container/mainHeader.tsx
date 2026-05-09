"use client";

import MainLogo from "@/components/ui/mainLogo";
import MobileMenuToggler from "@/components/ui/mobileMenuToggler";
import SearchBoxToggler from "@/components/ui/searchBoxToggler";

import HeaderDesktopNavigation from "./headerDesktopNavigation";
import HeaderMobileNavigation from "./headerMobileNavigation";

const MainHeader = () => {
  return (
    <div className="shadow-lg-gray px-4 md:px-8 py-1 md:py-2 rounded-full bg-white flex">
      <div className="flex-1 md:hidden flex items-center">
        <MobileMenuToggler />
      </div>

      <MainLogo className="w-10 md:w-20 object-contain" />
      <HeaderDesktopNavigation />
      <HeaderMobileNavigation />
      <div className="max-md:flex-1 flex items-center justify-end">
        <SearchBoxToggler />
      </div>
    </div>
  );
};

export default MainHeader;
