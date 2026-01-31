import type { KeyboardEvent, MouseEvent } from "react";

import { PopoverClose } from "@radix-ui/react-popover";
import { useTiptap } from "@tiptap/react";
import { Check, Link2 } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/dashboard/ui/button";
import { Field } from "@/components/dashboard/ui/field";
import { Input } from "@/components/dashboard/ui/input";
import { Label } from "@/components/dashboard/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/dashboard/ui/popover";

const AddLink = () => {
  const { editor, isReady } = useTiptap();
  console.log(editor);
  const linkRef = useRef<HTMLInputElement>(null);
  const [haveLink, setHaveLink] = useState<boolean>(false);
  // useEffect(() => {
  //   if (!editor) return;
  //   const update = () => {
  //     setHaveLink(editor.isActive("link"));
  //   };
  //   editor.on("selectionUpdate", update);
  //   editor.on("transaction", update);

  //   return () => {
  //     editor.off("selectionUpdate", update);
  //     editor.off("transaction", update);
  //   };
  // }, [editor]);

  if (!isReady || !editor) return;
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
    if (haveLink) {
      e.preventDefault();
      editor.chain().focus().unsetLink().run();
    }
  };
  const handleKeyDownForEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddLink();
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="line-through"
          type="button"
          variant={haveLink ? "default" : "outline"}
          onClick={removeLink}
        >
          <Link2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Field>
          <Label htmlFor="add-link-input">لینک اضافه کنید</Label>
          <div className="flex gap-1.5">
            <Input
              dir="ltr"
              id="add-link-input"
              ref={linkRef}
              type="url"
              onKeyDown={handleKeyDownForEnter}
            />
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
