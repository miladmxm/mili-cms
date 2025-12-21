import { getMedia } from "../dal/queries";
import FilePreview from "./filePreview";

const EditFileData = async ({ id }: { id: string }) => {
  const { meta, url, size, type } = await getMedia(id);
  return (
    <div className="flex">
      <div className="w-1/3">
        <FilePreview type={type} url={url} />
      </div>
      <div></div>
    </div>
  );
};

export default EditFileData;
