import Link from "next/link";

import type { Article } from "@/services/article/types";

import DefaultImage from "@/components/ui/defaultImage";

const CaruselArticleCard = ({ thumbnail, createdAt, title }: Article) => {
  return (
    <article className="flex flex-col md:flex-row gap-4">
      <Link href="#" className="flex-auto w-full md:max-w-2/3">
        <DefaultImage
          image={thumbnail}
          className="w-full aspect-[722/348] object-cover rounded-4xl md:rounded-7xl"
        />
      </Link>
      <div className="flex min-w-max gap-6 flex-auto flex-col rounded-3xl mt-auto max-md:bg-white p-4 max-md:shadow-lg-gray dir-rtl">
        <div className="flex gap-4 justify-between font-semibold text-xs md:text-sm">
          <span>
            تاریخ
            {Intl.DateTimeFormat("fa-ir").format(createdAt)}
          </span>
          <span>زمان مطالعه : ۵ دقیقه</span>
        </div>
        <Link href="#">
          <h5 className="font-bold text-sm md:text-lg">{title}</h5>
        </Link>
      </div>
    </article>
  );
};

export default CaruselArticleCard;
