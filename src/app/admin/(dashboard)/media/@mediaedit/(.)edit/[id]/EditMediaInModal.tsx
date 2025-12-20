"use client";
import type { FC, PropsWithChildren } from "react";

import { useRouter } from "next/navigation";

import Modal from "@/components/dashboard/modal";

const EditMediaInModal: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  return (
    <Modal title="ویرایش فایل" onClose={() => router.back()}>
      {children}
    </Modal>
  );
};

export default EditMediaInModal;
