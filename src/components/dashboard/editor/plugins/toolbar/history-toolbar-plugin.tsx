"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { IS_APPLE, mergeRegister } from "@lexical/utils";
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { RedoIcon, UndoIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { useToolbarContext } from "@/components/dashboard/editor/context/toolbar-context";
import { Button } from "@/components/dashboard/ui/button";
import { ButtonGroup } from "@/components/dashboard/ui/button-group";

export function HistoryToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const { activeEditor, $updateToolbar } = useToolbarContext();
  const [isEditable, setIsEditable] = useState(editor.isEditable());
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable);
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    );
  }, [$updateToolbar, activeEditor, editor]);

  return (
    <ButtonGroup className="rtl:flex-row-reverse">
      <Button
        size="icon"
        aria-label="Undo"
        className="!h-8 !w-8"
        disabled={!canUndo || !isEditable}
        title={IS_APPLE ? "پادگرد (⌘Z)" : "پادگرد (Ctrl+Z)"}
        type="button"
        variant="outline"
        onClick={() => {
          activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
      >
        <UndoIcon className="size-4" />
      </Button>
      <Button
        size="icon"
        aria-label="Redo"
        className="!h-8 !w-8"
        disabled={!canRedo || !isEditable}
        title={IS_APPLE ? "انجام مجدد (⇧⌘Z)" : "انجام مجدد (Ctrl+Y)"}
        type="button"
        variant="outline"
        onClick={() => {
          activeEditor.dispatchCommand(REDO_COMMAND, undefined);
        }}
      >
        <RedoIcon className="size-4" />
      </Button>
    </ButtonGroup>
  );
}
