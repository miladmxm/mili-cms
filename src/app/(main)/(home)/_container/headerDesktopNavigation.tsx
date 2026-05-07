import { motion, useMotionValue } from "motion/react";
import Link from "next/link";
import { useEffect, useEffectEvent, useRef } from "react";

// const ParentMenu = () => {};
// const Menu = ()=>{
//     return (
//         <
//     )
// }

const MegaMenu = () => {
  const productsItemInNavRef = useRef<HTMLSpanElement>(null);
  const top = useMotionValue(10);

  const setTop = useEffectEvent((t: number) => top.set(t));
  useEffect(() => {
    if (productsItemInNavRef.current) {
      const { bottom } = productsItemInNavRef.current.getBoundingClientRect();
      setTop(bottom);
    }
  }, []);
  return (
    <li className="cursor-pointer product-nav-trigger">
      <span className="flex h-full items-center" ref={productsItemInNavRef}>
        محصولات
      </span>
      <motion.div
        style={{ top }}
        className="mega-menu pt-4 container w-full fixed inset-x-0 top-20 transition-all duration-300 invisible h-0 pointer-events-none opacity-0 translate-y-10 -z-10"
      >
        <div className="p-4 rounded-6xl shadow-lg-gray h-full" />
      </motion.div>
    </li>
  );
};

const HeaderDesktopNavigation = () => {
  return (
    <nav className="flex-auto justify-center flex relative mega-menu-wrapper">
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
