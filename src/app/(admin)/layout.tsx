import type { FC, PropsWithChildren } from "react";

import "@/app/dashboard.css";
import { Toaster } from "@/components/dashboard/ui/sonner";

const adminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="w-full">
      {children}
      <Toaster />
    </main>
  );
};

export default adminLayout;
