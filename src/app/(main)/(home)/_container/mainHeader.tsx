"use client";

import MainLogo from "@/components/ui/mainLogo";
import MobileMenuToggler from "@/components/ui/mobileMenuToggler";
import SearchBoxToggler from "@/components/ui/searchBoxToggler";
import { useIsMobile } from "@/hooks/use-mobile";

import HeaderDesktopNavigation from "./headerDesktopNavigation";

const MainHeader = () => {
  const isMobile = useIsMobile();
  console.log(isMobile);
  return (
    <div className="shadow-lg-gray px-4 md:px-8 py-1 md:py-2 rounded-full flex items-center">
      {isMobile && (
        <div className="flex-1 flex items-center">
          <MobileMenuToggler />
        </div>
      )}
      <MainLogo className="w-10 md:w-20 object-contain" />
      {!isMobile && <HeaderDesktopNavigation />}
      <div className="max-md:flex-1 flex items-center justify-end">
        <SearchBoxToggler />
      </div>
    </div>
  );
};

export default MainHeader;
