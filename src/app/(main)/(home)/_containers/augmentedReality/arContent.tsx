import ButtonWithArrow from "@/components/ui/buttonWithArrow";
import H3 from "@/components/ui/h2";
import { cn } from "@/lib/utils";

const ARcontent = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex gap-6 flex-col justify-center items-start",
        className,
      )}
    >
      <H3 className="text-start">واقعیت افزوده</H3>
      <p className="text-thready-900 font-semibold text-justify text-lg">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
        از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای
        متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
        درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با
        نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
        خلاقی، و
      </p>
      <ButtonWithArrow className="py-4">
        تخت مناسب خودت رو انتخاب کن
      </ButtonWithArrow>
    </div>
  );
};

export default ARcontent;
