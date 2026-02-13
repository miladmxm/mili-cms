import { redirect, RedirectType } from "next/navigation";

import { getMediaById } from "@/services/media";

import EditFileForm from "../components/editFileForm";

const EditFileData = async ({ id }: { id: string }) => {
  const media = await getMediaById(id);
  if (!media) return redirect("/admin/media", RedirectType.replace);
  return <EditFileForm {...media} />;
};

export default EditFileData;
