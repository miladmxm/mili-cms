import BeforeHeader from "./beforeHeader";
import MainHeader from "./mainHeader";

const Header = () => {
  return (
    <header className="container sticky top-2 z-30">
      <BeforeHeader />
      <MainHeader />
    </header>
  );
};

export default Header;
