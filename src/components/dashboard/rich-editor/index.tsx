"use client";
import { EditorContent } from "@tiptap/react";

import type { RichEditorHandlerRef, Tags } from "./type";

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
import TagList from "./tools/tagList";

interface RichEditorProps {
  tags?: Tags;
  handlerRef?: RichEditorHandlerRef;
  onUpdate?: (content: string) => void;
}

const RichEditor = ({ tags, handlerRef, onUpdate }: RichEditorProps) => {
  const tagList = tags || [];
  const { editor } = useRichEditor({
    tags: tagList,
    ref: handlerRef,
    onUpdate,
  });

  if (!editor) return null;
  return (
    <Card className="gap-4 w-full max-w-5xl mx-auto">
      <CardHeader>
        <HeaderTools editor={editor} />
      </CardHeader>
      <Separator />
      <CardContent>
        {tagList.length > 0 && (
          <>
            <h6 className="mb-2">اضافه کردن تگ</h6>
            <TagList tags={tagList} editor={editor} />
            <Separator className="my-4" />
          </>
        )}
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
    </Card>
  );
};

export default RichEditor;
