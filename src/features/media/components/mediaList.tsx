"use client";
import { use } from "react";

import type { FileMeta, MediaTypes } from "@/services/media/type";

import FileCard from "./fileCard";
import MediaCardWrapper from "./MediaCardWrapper";

interface MediaListParameters {
  media: Promise<
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

const MediaList = ({ media: mediaRequest }: MediaListParameters) => {
  const media = use(mediaRequest);
  return (
    <MediaCardWrapper>
      {media.map((item) => (
        <FileCard key={item.id} {...item} />
      ))}
    </MediaCardWrapper>
  );
};

export default MediaList;
