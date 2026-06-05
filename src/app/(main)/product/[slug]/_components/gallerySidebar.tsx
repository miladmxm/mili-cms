import Comparison from "@/assets/icons/comparison.svg";
import Heart from "@/assets/icons/heart.svg";
import Play from "@/assets/icons/play.svg";
import Share from "@/assets/icons/share.svg";
import ShareButtonInSSR from "@/components/ui/share";

const GallerySidebar = () => {
  return (
    <div className="text-thready-800 px-3 w-12 flex flex-col justify-around h-2/3 my-auto">
      <button type="button">
        <Play />
      </button>
      <ShareButtonInSSR>
        <Share />
      </ShareButtonInSSR>
      <button type="button">
        <Comparison />
      </button>
      <button type="button">
        <Heart />
      </button>
    </div>
  );
};

export default GallerySidebar;
