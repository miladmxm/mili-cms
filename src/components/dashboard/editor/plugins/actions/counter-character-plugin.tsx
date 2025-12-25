"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $rootTextContent } from "@lexical/text";
import { useEffect, useState } from "react";

let textEncoderInstance: TextEncoder | null = null;

function textEncoder(): TextEncoder | null {
  if (window.TextEncoder === undefined) {
    return null;
  }

  if (textEncoderInstance === null) {
    textEncoderInstance = new window.TextEncoder();
  }

  return textEncoderInstance;
}

function utf8Length(text: string) {
  const currentTextEncoder = textEncoder();

  if (currentTextEncoder === null) {
    // http://stackoverflow.com/a/5515960/210370
    const m = encodeURIComponent(text).match(/%[89ab]/gi);
    return text.length + (m ? m.length : 0);
  }

  return currentTextEncoder.encode(text).length;
}

interface CounterCharacterPluginProps {
  charset?: "UTF-16" | "UTF-8";
}

const strlen = (text: string, charset: "UTF-16" | "UTF-8") => {
  if (charset === "UTF-8") {
    return utf8Length(text);
  } else if (charset === "UTF-16") {
    return text.length;
  }
};

const countWords = (text: string) => {
  return text.split(/\s+/).filter((word) => word.length > 0).length;
};

export function CounterCharacterPlugin({
  charset = "UTF-16",
}: CounterCharacterPluginProps) {
  const [editor] = useLexicalComposerContext();
  const [stats, setStats] = useState(() => {
    const initialText = editor.getEditorState().read($rootTextContent);
    return {
      characters: strlen(initialText, charset),
      words: countWords(initialText),
    };
  });

  useEffect(() => {
    return editor.registerTextContentListener((currentText: string) => {
      setStats({
        characters: strlen(currentText, charset),
        words: countWords(currentText),
      });
    });
  }, [editor, charset]);

  return (
    <div className="flex gap-2 text-xs whitespace-nowrap text-gray-500">
      <p>{stats.characters} واژ</p>|<p>{stats.words} کلمه</p>
    </div>
  );
}
