import MediaDropzone from "./mediaDropzone";
import DisplayUploadingFiles from "./uploadingFiles";

const AllMedias = () => {
  return (
    <div className="flex flex-col gap-6">
      <MediaDropzone />
      <DisplayUploadingFiles />
    </div>
  );
};

export default AllMedias;
