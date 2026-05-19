import type { Route } from "next";

import Link from "next/link";

import type { Media } from "@/services/media/type";

import DefaultImage from "./defaultImage";

interface SearchResultCardProps {
  title: string;
  link: Route;
  thumbnail?: Media | null;
  createdAt: Date;
  more: string;
}

const SearchResultCard = ({
  createdAt,
  more,
  link,
  title,
  thumbnail,
}: SearchResultCardProps) => {
  return (
    <Link href={link} className="relative pb-10">
      <DefaultImage
        image={thumbnail}
        className="w-full aspect-video rounded-4xl"
        alt={title}
      />
      <div className="absolute shadow-lg-gray bg-white bottom-0 inset-x-0 rounded-4xl flex flex-col gap-4 z-10 p-4">
        <div className="flex justify-between gap-2 text-xs font-semibold">
          <time dateTime={createdAt.toString()}>
            تاریخ:
            {Intl.DateTimeFormat("fa-ir").format(createdAt)}
          </time>
          <span>{more}</span>
        </div>
        <strong className="font-bold">{title}</strong>
      </div>
    </Link>
  );
};

export default SearchResultCard;
