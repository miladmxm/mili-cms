"use client";
import { use } from "react";

import type { MediaTypes } from "@/features/type";

interface MediaListParameters {
  medias: Promise<
    {
      type: MediaTypes;
      id: string;
      url: string;
      size: number;
      createdAt: Date;
      updatedAt: Date;
    }[]
  >;
}

const MediaList = ({ medias: mediasRequest }: MediaListParameters) => {
  const medias = use(mediasRequest);
  console.table(medias);
  return <div></div>;
};

export default MediaList;
