/* eslint-disable max-lines-per-function */
/* eslint-disable complexity */
/* eslint-disable @eslint-react/no-array-index-key */
import type { ReactNode } from "react";

import Image from "next/image";
import { Fragment } from "react";

import { cn } from "@/lib/utils";

export interface ProseMirror {
  type?: string;
  attrs?: Record<string, any>;
  content?: ProseMirror[];
  marks?: {
    type: string;
    attrs?: Record<string, any>;
  }[];
  text?: string;
}

interface Props {
  content: ProseMirror;
  className?: string;
}

export function ProseMirrorRenderer({ content, className }: Props) {
  return (
    <article
      dir="auto"
      className={cn(
        "max-w-none space-y-4 text-zinc-700 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        className,
      )}
    >
      <RenderNode node={content} />
    </article>
  );
}

function RenderNode({ node }: { node: ProseMirror }) {
  if (!node) return null;

  if (node.type === "text") {
    return <RenderText node={node} />;
  }

  const children = node.content?.map((child, index) => (
    <RenderNode key={`${child.type}-${index}`} node={child} />
  ));

  switch (node.type) {
    case "doc":
      return <>{children}</>;

    case "paragraph":
      return (
        <p
          dir={node.attrs?.dir}
          style={{
            textAlign: node.attrs?.textAlign || undefined,
          }}
          className="text-[15px] leading-8 text-zinc-600"
        >
          {children}
        </p>
      );

    case "heading": {
      const level = node.attrs?.level ?? 2;

      if (level === 1) {
        return (
          <h1 className="mt-12 mb-6 text-4xl font-extrabold tracking-tight text-zinc-950">
            {children}
          </h1>
        );
      }

      if (level === 2) {
        return (
          <h2 className="mt-12 mb-5 border-r-4 border-primary pr-4 text-2xl font-bold text-zinc-950">
            {children}
          </h2>
        );
      }

      if (level === 3) {
        return (
          <h3 className="mt-8 mb-3 text-lg font-semibold text-zinc-900">
            {children}
          </h3>
        );
      }

      return (
        <h4 className="mt-6 mb-2 text-base font-semibold text-zinc-900">
          {children}
        </h4>
      );
    }

    case "bulletList":
      return (
        <ul className="my-4 list-disc space-y-2 pr-6 marker:text-primary">
          {children}
        </ul>
      );

    case "orderedList":
      return <ol className="my-4 list-decimal space-y-2 pr-6">{children}</ol>;

    case "listItem":
      return <li className="leading-8">{children}</li>;

    case "blockquote":
      return (
        <blockquote className="my-8 border-r-4 border-zinc-200 pr-5 italic text-zinc-500">
          {children}
        </blockquote>
      );

    case "image":
      return (
        <figure className="my-8 overflow-hidden rounded-2xl">
          <Image
            src={node.attrs?.src}
            alt={node.attrs?.alt ?? ""}
            width={1200}
            height={800}
            unoptimized
            className="h-auto w-full object-cover"
          />
        </figure>
      );

    case "iframe":
      return (
        // <div className="my-8 overflow-hidden rounded-2xl border border-zinc-200">
        <iframe
          sandbox=""
          title="frame"
          src={node.attrs?.src}
          allowFullScreen={true}
          frameBorder={0}
          className="aspect-video w-full"
          dir="auto"
        />
        // </div>
      );

    case "horizontalRule":
      return <hr className="my-10 border-zinc-200" />;

    case "table":
      return (
        <div className="my-8 overflow-x-auto rounded-2xl border border-zinc-200">
          <table className="w-full border-collapse">
            <tbody>{children}</tbody>
          </table>
        </div>
      );

    case "tableRow":
      return <tr>{children}</tr>;

    case "tableHeader":
      return (
        <th
          colSpan={node.attrs?.colspan}
          rowSpan={node.attrs?.rowspan}
          className="border border-zinc-200 bg-zinc-50 px-4 py-3 text-right font-semibold text-zinc-900"
        >
          {children}
        </th>
      );

    case "tableCell":
      return (
        <td
          colSpan={node.attrs?.colspan}
          rowSpan={node.attrs?.rowspan}
          className="border border-zinc-200 px-4 py-3"
        >
          {children}
        </td>
      );

    case "hardBreak":
      return <br />;

    default:
      return <Fragment>{children}</Fragment>;
  }
}

function RenderText({ node }: { node: ProseMirror }) {
  let content: ReactNode = node.text;

  node.marks?.forEach((mark, index) => {
    switch (mark.type) {
      case "bold":
        content = (
          <strong key={index} className="font-bold text-zinc-900">
            {content}
          </strong>
        );
        break;

      case "italic":
        content = <em key={index}>{content}</em>;
        break;

      case "underline":
        content = (
          <u key={index} className="underline underline-offset-4">
            {content}
          </u>
        );
        break;

      case "strike":
        content = <s key={index}>{content}</s>;
        break;

      case "link":
        content = (
          <a
            key={index}
            href={mark.attrs?.href}
            target="_blank"
            rel={mark.attrs?.rel}
            className="font-medium text-primary underline underline-offset-4 transition-opacity hover:opacity-80"
          >
            {content}
          </a>
        );
        break;

      case "highlight":
        content = (
          <mark
            key={index}
            style={{
              backgroundColor: mark.attrs?.color ?? "#fef08a",
            }}
            className="rounded px-1 text-inherit"
          >
            {content}
          </mark>
        );
        break;

      case "textStyle":
        content = (
          <span
            key={index}
            style={{
              color: mark.attrs?.color,
              fontSize: mark.attrs?.fontSize,
              fontFamily: mark.attrs?.fontFamily,
              lineHeight: mark.attrs?.lineHeight,
              backgroundColor: mark.attrs?.backgroundColor,
            }}
          >
            {content}
          </span>
        );
        break;
    }
  });

  return <>{content}</>;
}
