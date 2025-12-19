import type { ReactNode } from "react";

const MediaLayout = ({
  children,
  mediaedit,
}: LayoutProps<"/admin/media"> & {
  mediaedit: ReactNode;
}) => {
  return (
    <div>
      {children}
      {mediaedit}
    </div>
  );
};

export default MediaLayout;
