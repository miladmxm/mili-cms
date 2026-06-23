import type { PropsWithChildren } from "react";

import Dialog from "@/components/ui/dialog";

import { closeAuthDialog, useAuthStore } from "../store/auth";

const DialogWrapper = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => {
  const isOpen = useAuthStore((state) => state.isOpenAuthDialog);

  return (
    <Dialog isOpen={isOpen} onClose={closeAuthDialog} title={title}>
      {children}
    </Dialog>
  );
};

export default DialogWrapper;
