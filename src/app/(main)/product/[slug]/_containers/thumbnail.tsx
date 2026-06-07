import type { Media } from "@/services/media/type";

import DefaultImage from "@/components/ui/defaultImage";

const Thumbnail = ({ thumbnail }: { thumbnail?: Media }) => {
  return (
    <section className="container py-10">
      <DefaultImage
        image={thumbnail}
        className="rounded-6xl w-full aspect-1014/503 object-cover"
      />
    </section>
  );
};

export default Thumbnail;
