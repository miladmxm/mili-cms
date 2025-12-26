"use client";

import type { InitialConfigType } from "@lexical/react/LexicalComposer";
import {
  $insertNodes,
  CLEAR_EDITOR_COMMAND,
  LexicalEditor,
  type EditorState,
  type SerializedEditorState,
} from "lexical";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import { editorTheme } from "@/components/dashboard/editor/themes/editor-theme";
import { TooltipProvider } from "@/components/dashboard/ui/tooltip";
import { cn } from "@/lib/utils";

import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { useEffect, useRef } from "react";
import { nodes } from "./nodes";
import { Plugins } from "./plugins";

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes,
  onError: (error: Error) => {
    console.error(error);
  },
};

function Editor({
  editorState,
  onChange,
  onSerializedChange,
  className,
  onHtmlChange,
  defaultHtmlValue,
}: {
  editorState?: EditorState;
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
  className?: string;
  onHtmlChange?: (value: string) => void;
  defaultHtmlValue?: string;
}) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(defaultHtmlValue || "", "text/html");
  const editoRef = useRef<LexicalEditor>(null);
  useEffect(() => {
    return () => {
      console.log("return");
      editoRef.current?.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
    };
  }, [editoRef.current]);
  return (
    <div
      className={cn(
        "bg-background overflow-hidden p-2  rounded-lg border shadow",
        className,
      )}
    >
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          ...(editorState ? { editorState } : {}),
          ...(defaultHtmlValue
            ? {
                editorState: (editor) => {
                  editoRef.current = editor;
                  editor.update(() => {
                    const nodes = $generateNodesFromDOM(editor, dom);
                    $insertNodes(nodes);
                  });
                },
              }
            : {}),
        }}
      >
        <TooltipProvider>
          <Plugins />

          <OnChangePlugin
            ignoreSelectionChange
            onChange={(editorState, editor) => {
              onChange?.(editorState);
              editor.read(() => {
                onHtmlChange?.($generateHtmlFromNodes(editor));
              });
              onSerializedChange?.(editorState.toJSON());
            }}
          />
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}

export default Editor;
