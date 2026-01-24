import type { Editor } from "@tiptap/core";
import type { EmojiClickData } from "emoji-picker-react";

import EmojiPicker, {
  EmojiStyle,
  SkinTonePickerLocation,
  Theme,
} from "emoji-picker-react";
import { useState } from "react";

import { Button } from "@/components/dashboard/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/dashboard/ui/popover";

const Emoji = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = useState<boolean>(false);
  const addEmoji = (emojiData: EmojiClickData) => {
    editor.chain().focus().insertContent(emojiData.emoji).run();
  };
  return (
    <Popover open={open}>
      <PopoverTrigger asChild>
        <Button
          size="icon-sm"
          type="button"
          variant="outline"
          onClick={() => setOpen(!open)}
        >
          😊
        </Button>
      </PopoverTrigger>
      <PopoverContent asChild>
        <EmojiPicker
          width={500}
          className="max-w-[95svw] mx-auto z-50"
          theme={Theme.AUTO}
          emojiStyle={EmojiStyle["NATIVE"]}
          onEmojiClick={addEmoji}
          searchPlaceHolder="جست و جو"
          skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
        />
      </PopoverContent>
    </Popover>
  );
};

export default Emoji;
