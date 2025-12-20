import { ViewTransition } from "react";

import { getMedia } from "../dal/queries";
import FilePreview from "./filePreview";

const EditFileData = async ({ id }: { id: string }) => {
  const { meta, url, size, type } = await getMedia(id);
  return (
    <div className="flex">
      <div className="w-1/3">
        <ViewTransition name={id}>
          <FilePreview type={type} url={url} />
        </ViewTransition>
      </div>
      <div></div>
    </div>
  );
};

export default EditFileData;
