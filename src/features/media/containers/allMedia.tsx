import { Suspense } from "react";

import { FileCardSkeleton } from "../components/fileCard";
import MediaCardWrapper from "../components/MediaCardWrapper";
import MediaDropzone from "../components/mediaDropzone";
import MediaList from "../components/mediaList";
import DisplayUploadingFiles from "../components/uploadingFiles";
import { getMedia } from "../dal/queries";

const AllMedia = () => {
  const media = getMedia();
  return (
    <div className="flex flex-col gap-6">
      <MediaDropzone />
      <DisplayUploadingFiles />
      <Suspense
        fallback={
          <MediaCardWrapper>
            <FileCardSkeleton />
          </MediaCardWrapper>
        }
      >
        <MediaList media={media} />
      </Suspense>
    </div>
  );
};

export default AllMedia;
