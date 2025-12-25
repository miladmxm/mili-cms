/* eslint-disable @eslint-react/hooks-extra/no-direct-set-state-in-use-effect */
"use client";

import type {
  EditorThemeClasses,
  Klass,
  LexicalCommand,
  LexicalEditor,
  LexicalNode,
} from "lexical";
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type { JSX } from "react";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createTableNodeWithDimensions,
  INSERT_TABLE_COMMAND,
  TableNode,
} from "@lexical/table";
import { $insertNodes, COMMAND_PRIORITY_EDITOR, createCommand } from "lexical";
import { createContext, use, useEffect, useMemo, useState } from "react";

import { invariant } from "@/components/dashboard/editor/shared/invariant";
import { Button } from "@/components/dashboard/ui/button";
import { DialogFooter } from "@/components/dashboard/ui/dialog";
import { Input } from "@/components/dashboard/ui/input";
import { Label } from "@/components/dashboard/ui/label";

export type InsertTableCommandPayload = Readonly<{
  columns: string;
  rows: string;
  includeHeaders?: boolean;
}>;

export interface CellContextShape {
  cellEditorConfig: CellEditorConfig | null;
  cellEditorPlugins: JSX.Element | JSX.Element[] | null;
  set: (
    cellEditorConfig: CellEditorConfig | null,
    cellEditorPlugins: JSX.Element | JSX.Element[] | null,
  ) => void;
}

export type CellEditorConfig = Readonly<{
  namespace: string;
  nodes?: readonly Klass<LexicalNode>[];
  onError: (error: Error, editor: LexicalEditor) => void;
  readOnly?: boolean;
  theme?: EditorThemeClasses;
}>;

export const INSERT_NEW_TABLE_COMMAND: LexicalCommand<InsertTableCommandPayload> =
  createCommand("INSERT_NEW_TABLE_COMMAND");

export const CellContext = createContext<CellContextShape>({
  cellEditorConfig: null,
  cellEditorPlugins: null,
  set: () => {
    // Empty
  },
});
CellContext.displayName = "CellContext";

export function TableContext({ children }: { children: JSX.Element }) {
  const [contextValue, setContextValue] = useState<{
    cellEditorConfig: CellEditorConfig | null;
    cellEditorPlugins: JSX.Element | JSX.Element[] | null;
  }>({
    cellEditorConfig: null,
    cellEditorPlugins: null,
  });
  return (
    <CellContext
      value={useMemo(
        () => ({
          cellEditorConfig: contextValue.cellEditorConfig,
          cellEditorPlugins: contextValue.cellEditorPlugins,
          set: (cellEditorConfig, cellEditorPlugins) => {
            setContextValue({ cellEditorConfig, cellEditorPlugins });
          },
        }),
        [contextValue.cellEditorConfig, contextValue.cellEditorPlugins],
      )}
    >
      {children}
    </CellContext>
  );
}

export function InsertTableDialog({
  activeEditor,
  onClose,
}: {
  activeEditor: LexicalEditor;
  onClose: () => void;
}): JSX.Element {
  const [rows, setRows] = useState("5");
  const [columns, setColumns] = useState("5");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const row = Number(rows);
    const column = Number(columns);
    if (row && row > 0 && row <= 500 && column && column > 0 && column <= 50) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [rows, columns]);

  const onClick = () => {
    activeEditor.dispatchCommand(INSERT_TABLE_COMMAND, {
      columns,
      rows,
    });

    onClose();
  };

  return (
    <>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="rows">Number of rows</Label>
          <Input
            data-test-id="table-modal-rows"
            id="rows"
            type="number"
            value={rows}
            onChange={(e) => setRows(e.target.value)}
            placeholder="# of rows (1-500)"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="columns">Number of columns</Label>
          <Input
            data-test-id="table-modal-columns"
            id="columns"
            type="number"
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
            placeholder="# of columns (1-50)"
          />
        </div>
      </div>
      <DialogFooter data-test-id="table-model-confirm-insert">
        <Button disabled={isDisabled} onClick={onClick}>
          تایید
        </Button>
      </DialogFooter>
    </>
  );
}

export function TablePlugin({
  cellEditorConfig,
  children,
}: {
  cellEditorConfig: CellEditorConfig;
  children: JSX.Element | JSX.Element[];
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  const cellContext = use(CellContext);

  useEffect(() => {
    if (!editor.hasNodes([TableNode])) {
      invariant(false, "TablePlugin: TableNode is not registered on editor");
    }

    cellContext.set(cellEditorConfig, children);

    return editor.registerCommand<InsertTableCommandPayload>(
      INSERT_NEW_TABLE_COMMAND,
      ({ columns, rows, includeHeaders }) => {
        const tableNode = $createTableNodeWithDimensions(
          Number(rows),
          Number(columns),
          includeHeaders,
        );
        $insertNodes([tableNode]);
        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [cellContext, cellEditorConfig, children, editor]);

  return null;
}
