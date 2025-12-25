"use client";

import type { InitialConfigType } from "@lexical/react/LexicalComposer";
import type { EditorState, SerializedEditorState } from "lexical";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import { editorTheme } from "@/components/dashboard/editor/themes/editor-theme";
import { TooltipProvider } from "@/components/dashboard/ui/tooltip";
import { useDirection } from "@/hooks/useDirection";
import { cn } from "@/lib/utils";

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
  editorSerializedState,
  onChange,
  onSerializedChange,
  className,
}: {
  editorState?: EditorState;
  editorSerializedState?: SerializedEditorState;
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
  className?: string;
}) {
  const dir = useDirection();
  return (
    <div
      className={cn(
        "bg-background overflow-hidden p-2 rounded-lg border shadow",
        { "**:dir-rtl": dir === "rtl" },
        className,
      )}
    >
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          ...(editorState ? { editorState } : {}),
          ...(editorSerializedState
            ? { editorState: JSON.stringify(editorSerializedState) }
            : {}),
        }}
      >
        <TooltipProvider>
          <Plugins />

          <OnChangePlugin
            ignoreSelectionChange
            // eslint-disable-next-line @typescript-eslint/no-shadow
            onChange={(editorState) => {
              onChange?.(editorState);
              onSerializedChange?.(editorState.toJSON());
            }}
          />
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}

export default Editor;
