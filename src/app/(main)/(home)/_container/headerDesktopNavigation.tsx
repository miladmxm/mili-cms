import Link from "next/link";

const HeaderDesktopNavigation = () => {
  return (
    <nav className="flex-auto center">
      <ul className="flex lg:gap-8 gap-4 *:hover:text-secondary-500">
        <li className="cursor-pointer">محصولات</li>
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
