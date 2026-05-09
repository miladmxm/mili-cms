import BeforeHeader from "./beforeHeader";
import MainHeader from "./mainHeader";

const Header = () => {
  return (
    <header className="container">
      <BeforeHeader />
      <MainHeader />
    </header>
  );
};

export default Header;
