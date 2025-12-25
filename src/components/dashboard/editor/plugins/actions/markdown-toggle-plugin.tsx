"use client";

import type { Transformer } from "@lexical/markdown";

import { $createCodeNode, $isCodeNode } from "@lexical/code";
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
} from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createTextNode, $getRoot } from "lexical";
import { FileTextIcon } from "lucide-react";
import { useCallback } from "react";

import { Button } from "@/components/dashboard/ui/button";

export function MarkdownTogglePlugin({
  shouldPreserveNewLinesInMarkdown,
  transformers,
}: {
  shouldPreserveNewLinesInMarkdown: boolean;
  transformers: Transformer[];
}) {
  const [editor] = useLexicalComposerContext();

  const handleMarkdownToggle = useCallback(() => {
    editor.update(() => {
      const root = $getRoot();
      const firstChild = root.getFirstChild();
      if ($isCodeNode(firstChild) && firstChild.getLanguage() === "markdown") {
        $convertFromMarkdownString(
          firstChild.getTextContent(),
          transformers,
          undefined, // node
          shouldPreserveNewLinesInMarkdown,
        );
      } else {
        const markdown = $convertToMarkdownString(
          transformers,
          undefined, //node
          shouldPreserveNewLinesInMarkdown,
        );
        const codeNode = $createCodeNode("markdown");
        codeNode.append($createTextNode(markdown));
        root.clear().append(codeNode);
        if (markdown.length === 0) {
          codeNode.select();
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, shouldPreserveNewLinesInMarkdown]);

  return (
    <Button
      size="sm"
      aria-label="Convert from markdown"
      className="p-2"
      title="Convert From Markdown"
      variant="ghost"
      onClick={handleMarkdownToggle}
    >
      <FileTextIcon className="size-4" />
    </Button>
  );
}
