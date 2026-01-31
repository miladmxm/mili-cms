import type { Editor } from "@tiptap/react";

import { useTiptap, useTiptapState } from "@tiptap/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/dashboard/ui/select";

import { BLOCKITEMS } from "./data";

const getCurrentBlock = (editor: Editor) => {
  let resutl: string = "paragraph";
  for (const key of Object.keys(BLOCKITEMS)) {
    const { attributes, name } = BLOCKITEMS[key as keyof typeof BLOCKITEMS];
    if (editor.isActive(name, attributes)) {
      resutl = key;
    }
  }
  return resutl;
};

const BlockFormat = () => {
  const { editor, isReady } = useTiptap();
  const value = useTiptapState((ctx) => getCurrentBlock(ctx.editor));

  if (!editor || !isReady) return;
  const handleSetValue = (e: string) => {
    const block = BLOCKITEMS[e as keyof typeof BLOCKITEMS];
    if (block.attributes) {
      console.log(block);
      editor.chain().focus()[block.operation](block.attributes).run();
    } else {
      editor.chain().focus()[block.operation]().run();
    }
  };
  return (
    <Select value={value} onValueChange={handleSetValue}>
      <SelectTrigger>
        <SelectValue className="text-xs" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(BLOCKITEMS).map((key) => {
          const name = key as keyof typeof BLOCKITEMS;
          const { Icon, label } = BLOCKITEMS[name];
          return (
            <SelectItem key={name} value={name}>
              <Icon />
              {label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default BlockFormat;
