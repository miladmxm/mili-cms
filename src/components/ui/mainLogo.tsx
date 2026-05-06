import Image from "next/image";

import logo from "@/assets/images/logo.png";

const MainLogo = ({ className }: { className?: string }) => {
  return <Image className={className} alt="logo" src={logo} />;
};

export default MainLogo;
