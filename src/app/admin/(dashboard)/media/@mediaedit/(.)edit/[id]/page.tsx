import EditFileData from "@/features/media/components/editFileData";

import EditMediaInModal from "./EditMediaInModal";

const EditMediaPage = async ({
  params,
}: PageProps<"/admin/media/edit/[id]">) => {
  const { id } = await params;
  return (
    <EditMediaInModal>
      <EditFileData id={id} />
    </EditMediaInModal>
  );
};

export default EditMediaPage;
