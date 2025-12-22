import type { FC, PropsWithChildren } from "react";

import { X } from "lucide-react";

import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

interface ModalProps {
  onClose: () => void;
  title?: string;
}
const Modal: FC<ModalProps & PropsWithChildren> = ({
  children,
  onClose,
  title,
}) => {
  return (
    <div className="fixed center inset-0 z-50 isolate">
      <button
        className="inset-0 bg-black/40 -z-10 absolute"
        type="button"
        onClick={onClose}
      ></button>
      <Card className="md:h-4/5 overflow-auto md:w-4/6 sm:size-5/6 size-11/12 max-w-6xl max-h-max">
        <CardHeader>
          {title && (
            <CardTitle className="my-auto row-span-2">{title}</CardTitle>
          )}
          <CardAction>
            <Button size="icon-sm" variant="outline" onClick={onClose}>
              <X />
            </Button>
          </CardAction>
        </CardHeader>
        <Separator />
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

export default Modal;
