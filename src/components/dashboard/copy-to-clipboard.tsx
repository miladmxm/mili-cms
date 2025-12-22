"use client";
import { Check, Copy } from "lucide-react";
import { useState, ViewTransition } from "react";

import { Button } from "./ui/button";

const CopyToClipboard = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);
  const copyHandler = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button size="icon-sm" disabled={copied} onClick={copyHandler}>
      <ViewTransition>{copied ? <Check /> : <Copy />}</ViewTransition>
    </Button>
  );
};

export default CopyToClipboard;
