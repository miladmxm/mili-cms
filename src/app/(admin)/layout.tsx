import type { FC, PropsWithChildren } from "react";

import "@/app/dashboard.css";

const adminLayout: FC<PropsWithChildren> = ({ children }) => {
  return <main className="w-full">{children}</main>;
};

export default adminLayout;
