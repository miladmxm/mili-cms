import type { Editor } from "@tiptap/core";
import type { MouseEvent } from "react";

import { PopoverClose } from "@radix-ui/react-popover";
import { Check, Link2 } from "lucide-react";
import { useRef } from "react";

import { Button } from "@/components/dashboard/ui/button";
import { Field } from "@/components/dashboard/ui/field";
import { Input } from "@/components/dashboard/ui/input";
import { Label } from "@/components/dashboard/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/dashboard/ui/popover";

const AddLink = ({ editor }: { editor: Editor }) => {
  const linkRef = useRef<HTMLInputElement>(null);
  const handleAddLink = () => {
    const linkInput = linkRef.current;
    if (linkInput) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkInput.value })
        .run();
      linkInput.value = "";
    }
  };
  const removeLink = (e: MouseEvent<HTMLButtonElement>) => {
    if (editor.isActive("link")) {
      e.preventDefault();
      editor.chain().focus().unsetLink().run();
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon-sm"
          className="line-through"
          type="button"
          variant="outline"
          onClick={removeLink}
        >
          <Link2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Field>
          <Label htmlFor="add-link-input">لینک اضافه کنید</Label>
          <div className="flex gap-1.5">
            <Input dir="ltr" id="add-link-input" ref={linkRef} type="url" />
            <PopoverClose asChild>
              <Button size="icon-sm" onClick={handleAddLink}>
                <Check />
              </Button>
            </PopoverClose>
          </div>
        </Field>
      </PopoverContent>
    </Popover>
  );
};

export default AddLink;
