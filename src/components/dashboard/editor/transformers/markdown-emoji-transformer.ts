import type { TextMatchTransformer } from "@lexical/markdown";

import { $createTextNode } from "lexical";

import emojiList from "@/components/dashboard/editor/utils/emoji-list";

export const EMOJI: TextMatchTransformer = {
  dependencies: [],
  export: () => null,
  importRegExp: /:([0-9_a-z]+):/,
  regExp: /:([0-9_a-z]+):/,
  replace: (textNode, [, name]) => {
    const emoji = emojiList.find((e) => e.aliases.includes(name))?.emoji;
    if (emoji) {
      textNode.replace($createTextNode(emoji));
    }
  },
  trigger: ":",
  type: "text-match",
};
