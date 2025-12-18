"use client";

import { useMediaStore } from "@/store/media.store";

import { FileCardForUpload } from "./fileCard";

const DisplayUploadingFiles = () => {
  const { uploadingMedias } = useMediaStore();
  return (
    <div className="flex gap-5 flex-wrap ">
      {uploadingMedias.map((uploadingMedia) => (
        <FileCardForUpload key={uploadingMedia.id} {...uploadingMedia} />
      ))}
    </div>
  );
};

export default DisplayUploadingFiles;
