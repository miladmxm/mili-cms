import RectangleGB from "@/assets/images/rectangleBG.svg";

const FaqBackground = () => {
  return (
    <div className="absolute -z-10 inset-0 flex justify-between *:h-3/4 ">
      <RectangleGB className="*:stroke-primary-200 mt-auto translate-x-1/2" />
      <RectangleGB className="*:stroke-primary-200 mb-auto -translate-x-1/2" />
    </div>
  );
};

export default FaqBackground;
