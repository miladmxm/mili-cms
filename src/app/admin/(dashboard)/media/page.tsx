import AllMedia from "@/features/media/containers/allMedia";

const Media = async ({ searchParams }: PageProps<"/admin/media">) => {
  return (
    <div>
      <AllMedia searchParams={await searchParams} />
    </div>
  );
};

export default Media;
