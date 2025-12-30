import { Suspense } from "react";

import MediaDropzone from "../components/mediaDropzone";
import MediaList from "../components/mediaList";
import DisplayUploadingFiles from "../components/uploadingFiles";
import { getMedias } from "../dal/queries";

const AllMedias = () => {
  const medias = getMedias();
  return (
    <div className="flex flex-col gap-6">
      <MediaDropzone />
      <DisplayUploadingFiles />
      <Suspense fallback={<div>loading...</div>}>
        <MediaList medias={medias} />
      </Suspense>
    </div>
  );
};

export default AllMedias;
