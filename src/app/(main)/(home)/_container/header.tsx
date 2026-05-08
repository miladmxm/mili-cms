import BeforeHeader from "./beforeHeader";
import HeaderMobileNavigation from "./headerMobileNavigation";

const Header = () => {
  return (
    <header className="container">
      <BeforeHeader />
      <HeaderMobileNavigation />
    </header>
  );
};

export default Header;
