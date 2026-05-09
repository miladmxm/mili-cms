import Link from "next/link";

import MegaMenu from "./megaMenu";

const HeaderDesktopNavigation = () => {
  return (
    <nav className="flex-auto max-md:hidden justify-center flex relative mega-menu-wrapper">
      <ul className="flex lg:gap-8 gap-4 *:hover:text-secondary-500 h-full *:items-center *:flex">
        <MegaMenu />
        <li>
          <Link href="#">پیشنهاد ویژه</Link>
        </li>
        <li>
          <Link href="#">خرید اقساطی</Link>
        </li>
        <li>
          <Link href="#">واقعیت افزوده</Link>
        </li>
        <li>
          <Link href="#">تماس با ما</Link>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderDesktopNavigation;
