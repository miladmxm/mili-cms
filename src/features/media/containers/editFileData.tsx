import EditFileForm from "../components/editFileForm";
import { getMedia } from "../dal/queries";

const EditFileData = async ({ id }: { id: string }) => {
  const media = await getMedia(id);

  return <EditFileForm {...media} />;
};

export default EditFileData;
