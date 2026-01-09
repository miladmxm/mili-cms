"use client";

import { ViewTransition } from "react";

import { useMediaStore } from "@/features/media/store/media.store";

import { FileCardForUpload } from "./fileCard";

const DisplayUploadingFiles = () => {
  const { uploadingMedias } = useMediaStore();
  return (
    <div className="flex gap-5 flex-wrap ">
      <ViewTransition enter="auto">
        {uploadingMedias.map((uploadingMedia) => (
          <FileCardForUpload key={uploadingMedia.id} {...uploadingMedia} />
        ))}
      </ViewTransition>
    </div>
  );
};

export default DisplayUploadingFiles;
