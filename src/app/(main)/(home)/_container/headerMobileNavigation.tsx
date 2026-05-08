import Link from "next/link";

import MobileMenu from "./mobileMenu";

const HeaderMobileNavigation = () => {
  return (
    <MobileMenu>
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
    </MobileMenu>
  );
};

export default HeaderMobileNavigation;
