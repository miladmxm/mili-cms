import FooterBackground from "./footerBackground";
import FooterLogo from "./footerLogo";
import FooterMainContent from "./mainContent";
import SocialLinks from "./socialLinks";

const Footer = () => {
  return (
    <footer className="container pb-12">
      <FooterBackground>
        <FooterLogo />
        <FooterMainContent />
        <SocialLinks />
      </FooterBackground>
    </footer>
  );
};

export default Footer;
