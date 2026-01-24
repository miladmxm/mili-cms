"use client";
import { EditorContent, EditorContext } from "@tiptap/react";
import { useMemo } from "react";

import type { RichEditorHandlerRef } from "./type";

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { useRichEditor } from "./hook";
import classes from "./index.module.css";
import { FooterTools, HeaderTools } from "./tools";

interface RichEditorProps {
  handlerRef?: RichEditorHandlerRef;
  onUpdate?: (content: string) => void;
}

const RichEditor = ({ handlerRef, onUpdate }: RichEditorProps) => {
  const { editor } = useRichEditor({
    ref: handlerRef,
    onUpdate,
  });
  const providerValue = useMemo(() => ({ editor }), [editor]);

  if (!editor) return null;
  return (
    <Card className="gap-4 w-full max-w-5xl mx-auto">
      <EditorContext value={providerValue}>
        <CardHeader>
          <HeaderTools />
        </CardHeader>
        <Separator />
        <CardContent>
          <div className="border border-dashed overflow-y-auto rounded-lg max-h-[60svh]">
            <EditorContent className={classes.wrapper} editor={editor} />
          </div>
        </CardContent>
        <Separator />
        <CardFooter>
          <CardAction className="ms-auto">
            <FooterTools editor={editor} />
          </CardAction>
        </CardFooter>
      </EditorContext>
    </Card>
  );
};

export default RichEditor;
