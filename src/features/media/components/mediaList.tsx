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
  console.log(medias);
  return (
    <div>
      {medias.map((item) => (
        <FileCard key={item.id} {...item} />
      ))}
    </div>
  );
};

export default MediaList;
