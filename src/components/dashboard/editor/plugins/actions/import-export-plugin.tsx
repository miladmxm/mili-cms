"use client";

import { exportFile, importFile } from "@lexical/file";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { DownloadIcon, UploadIcon } from "lucide-react";

import { Button } from "@/components/dashboard/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/dashboard/ui/tooltip";

export function ImportExportPlugin() {
  const [editor] = useLexicalComposerContext();
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="sm"
            aria-label="Import editor state from JSON"
            className="p-2"
            title="Import"
            variant="ghost"
            onClick={() => importFile(editor)}
          >
            <UploadIcon className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>وارد کردن محتوا</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="sm"
            aria-label="Export editor state to JSON"
            className="p-2"
            title="Export"
            variant="ghost"
            onClick={() =>
              exportFile(editor, {
                fileName: `Playground ${new Date().toISOString()}`,
                source: "Playground",
              })
            }
          >
            <DownloadIcon className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>دانلود محتوا</TooltipContent>
      </Tooltip>
    </>
  );
}
