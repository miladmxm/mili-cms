"use client";

import type { JSX } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TreeView } from "@lexical/react/LexicalTreeView";
import { NotebookPenIcon } from "lucide-react";

import { Button } from "@/components/dashboard/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dashboard/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/dashboard/ui/scroll-area";

export function TreeViewPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="p-2" variant="ghost">
          <NotebookPenIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tree View</DialogTitle>
        </DialogHeader>
        <ScrollArea className="bg-foreground text-background h-96 overflow-hidden rounded-lg p-2">
          <TreeView
            timeTravelPanelClassName="debug-timetravel-panel"
            timeTravelPanelSliderClassName="debug-timetravel-panel-slider"
            viewClassName="tree-view-output"
            editor={editor}
            timeTravelButtonClassName="debug-timetravel-button"
            timeTravelPanelButtonClassName="debug-timetravel-panel-button"
            treeTypeButtonClassName="debug-treetype-button"
          />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
