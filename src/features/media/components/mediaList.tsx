"use client";
import { use } from "react";

import type { FileMeta, MediaTypes } from "@/features/type";

import FileCard from "./fileCard";

interface MediaListParameters {
  medias: Promise<
    {
      type: MediaTypes;
      id: string;
      url: string;
      size: number;
      meta: FileMeta;
      createdAt: Date;
      updatedAt: Date;
    }[]
  >;
}

const MediaList = ({ medias: mediasRequest }: MediaListParameters) => {
  const medias = use(mediasRequest);
  return (
    <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {medias.map((item) => (
        <FileCard key={item.id} {...item} />
      ))}
    </div>
  );
};

export default MediaList;
