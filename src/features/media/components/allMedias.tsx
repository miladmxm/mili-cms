import { Suspense } from "react";

import { getMedias } from "../dal/queries";
import MediaDropzone from "./mediaDropzone";
import MediaList from "./mediaList";
import DisplayUploadingFiles from "./uploadingFiles";

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
