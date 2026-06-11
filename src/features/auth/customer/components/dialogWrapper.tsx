/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { PropsWithChildren } from "react";

import { Activity } from "react";

import Close from "@/assets/icons/close.svg";

import { closeAuthDialog, useAuthStore } from "../store/auth";

const DialogWrapper = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => {
  const isOpen = useAuthStore((state) => state.isOpenAuthDialog);

  return (
    <Activity mode={isOpen ? "visible" : "hidden"} name="auth-dialog">
      <div className="fixed z-50 inset-0 center">
        <div
          className="inset-0 cursor-pointer backdrop-blur-xs absolute -z-10"
          onClick={closeAuthDialog}
        />
        <div className="bg-white shadow-sm-gray w-[95%] max-w-lg rounded-6xl overflow-hidden">
          <header className="bg-primary-50 p-6 flex items-center justify-between">
            <h5 className="font-bold md:text-lg"> {title}</h5>
            <button
              type="button"
              className="size-3 *:size-full"
              onClick={closeAuthDialog}
            >
              <Close />
            </button>
          </header>
          {children}
        </div>
      </div>
    </Activity>
  );
};

export default DialogWrapper;
