"use client";
import { Tiptap } from "@tiptap/react";

import type { RichEditorHandlerRef } from "./type";

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
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

  if (!editor) return null;
  return (
    <Card className="gap-4 w-full max-w-5xl mx-auto">
      <Tiptap instance={editor}>
        <CardHeader>
          <HeaderTools />
        </CardHeader>
        <Separator />
        <CardContent>
          <div className="border relative border-dashed overflow-y-auto rounded-lg max-h-[60svh]">
            <Tiptap.Loading>
              <Skeleton className="size-full" />
            </Tiptap.Loading>
            <Tiptap.Content className={classes.wrapper} />
          </div>
        </CardContent>
        <Separator />
        <CardFooter>
          <CardAction className="ms-auto">
            <FooterTools editor={editor} />
          </CardAction>
        </CardFooter>
      </Tiptap>
    </Card>
  );
};

export default RichEditor;
