import { getMedia } from "../dal/queries";
import EditFileForm from "./editFileForm";

const EditFileData = async ({ id }: { id: string }) => {
  const media = await getMedia(id);

  return <EditFileForm {...media} />;
};

export default EditFileData;
