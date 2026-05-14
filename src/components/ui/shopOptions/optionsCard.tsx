import type { FC, ReactNode } from "react";

const OptionsCard = ({
  title,
  icon,
  subTitle,
}: {
  title: string;
  icon: FC<{ className?: string }>;
  subTitle: ReactNode;
}) => {
  const Icon = icon;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4 relative rounded-full bg-primary-500">
        <Icon className="size-14 aspect-square max-h-full md:size-20 scale-125 origin-bottom-left bottom-0" />
        <h4 className="text-primary-900 center w-full font-bold text-sm md:text-2xl">
          {title}
        </h4>
      </div>
      <p className="text-primary-900 text-center">{subTitle}</p>
    </div>
  );
};

export default OptionsCard;
