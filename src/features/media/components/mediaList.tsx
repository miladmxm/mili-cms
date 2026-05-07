"use client";

import { use } from "react";

import type { FileMeta, MediaTypes } from "@/services/media/type";

import { Spinner } from "@/components/dashboard/ui/spinner";

import { useInfinityScroll } from "../hooks/useInfinityScroll";
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
  const { handleScroll, wrapperRef, pending } = useInfinityScroll(media);
  return (
    <div className="overflow-y-auto h-full pe-2" onScrollEnd={handleScroll}>
      <MediaCardWrapper ref={wrapperRef}>
        {media.map((item) => (
          <FileCard key={item.id} {...item} />
        ))}
      </MediaCardWrapper>
      {pending && (
        <div className="center h-10">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default MediaList;
