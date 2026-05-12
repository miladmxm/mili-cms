import HomeCategorySVG from "@/components/ui/cropSVG/homeCategory";
import PillowSVG from "@/components/ui/cropSVG/pillow";

const CropSVG = () => {
  return (
    <>
      <PillowSVG desktopId="pillow-desktop" mobileId="pillow-mobile" />
      <HomeCategorySVG id="home-category" />
    </>
  );
};

export default CropSVG;
