import "@/app/globals.css";

import type { FC, PropsWithChildren } from "react";

const mainLayout: FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default mainLayout;
