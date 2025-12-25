import type { Klass, LexicalNode, LexicalNodeReplacement } from "lexical";

import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { HashtagNode } from "@lexical/hashtag";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { OverflowNode } from "@lexical/overflow";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ParagraphNode, TextNode } from "lexical";

import { AutocompleteNode } from "@/components/dashboard/editor/nodes/autocomplete-node";
import { TweetNode } from "@/components/dashboard/editor/nodes/embeds/tweet-node";
import { YouTubeNode } from "@/components/dashboard/editor/nodes/embeds/youtube-node";
import { EmojiNode } from "@/components/dashboard/editor/nodes/emoji-node";
import { ImageNode } from "@/components/dashboard/editor/nodes/image-node";
import { KeywordNode } from "@/components/dashboard/editor/nodes/keyword-node";
import { LayoutContainerNode } from "@/components/dashboard/editor/nodes/layout-container-node";
import { LayoutItemNode } from "@/components/dashboard/editor/nodes/layout-item-node";
import { MentionNode } from "@/components/dashboard/editor/nodes/mention-node";

export const nodes: readonly (Klass<LexicalNode> | LexicalNodeReplacement)[] = [
  HeadingNode,
  ParagraphNode,
  TextNode,
  QuoteNode,
  ListNode,
  ListItemNode,
  LinkNode,
  OverflowNode,
  HashtagNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  CodeNode,
  CodeHighlightNode,
  HorizontalRuleNode,
  MentionNode,
  ImageNode,
  EmojiNode,
  KeywordNode,
  LayoutContainerNode,
  LayoutItemNode,
  AutoLinkNode,
  TweetNode,
  YouTubeNode,
  AutocompleteNode,
];
