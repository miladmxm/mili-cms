import MobileMenu, { MenuItemLink } from "./mobileMenu";

const HeaderMobileNavigation = () => {
  return (
    <MobileMenu>
      <MenuItemLink href="#">پیشنهاد ویژه</MenuItemLink>
      <MenuItemLink href="#">خرید اقساطی</MenuItemLink>
      <MenuItemLink href="#">واقعیت افزوده</MenuItemLink>
      <MenuItemLink href="#">تماش با ما</MenuItemLink>
    </MobileMenu>
  );
};

export default HeaderMobileNavigation;
