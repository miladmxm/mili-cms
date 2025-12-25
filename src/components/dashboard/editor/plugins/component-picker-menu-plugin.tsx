/* eslint-disable @eslint-react/no-unstable-default-props */
"use client";

import type { TextNode } from "lexical";
import type { JSX } from "react";

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useBasicTypeaheadTriggerMatch } from "@lexical/react/LexicalTypeaheadMenuPlugin";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useEditorModal } from "@/components/dashboard/editor/editor-hooks/use-modal";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/dashboard/ui/command";

import type { ComponentPickerOption } from "./picker/component-picker-option";

const LexicalTypeaheadMenuPlugin = dynamic(
  () =>
    import("@lexical/react/LexicalTypeaheadMenuPlugin").then(
      (mod) => mod.LexicalTypeaheadMenuPlugin<ComponentPickerOption>,
    ),
  { ssr: false },
);

function ComponentPickerMenu({
  options,
  selectedIndex,
  selectOptionAndCleanUp,
  setHighlightedIndex,
}: {
  options: ComponentPickerOption[];
  selectedIndex: number | null;
  selectOptionAndCleanUp: (option: ComponentPickerOption) => void;
  setHighlightedIndex: (index: number) => void;
}) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (selectedIndex !== null && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "auto",
      });
    }
  }, [selectedIndex]);

  return (
    <div className="absolute z-10 h-min w-[250px] rounded-md shadow-md end-0">
      <Command
        onKeyDown={(e) => {
          if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex(
              selectedIndex !== null
                ? (selectedIndex - 1 + options.length) % options.length
                : options.length - 1,
            );
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex(
              selectedIndex !== null ? (selectedIndex + 1) % options.length : 0,
            );
          }
        }}
      >
        <CommandList>
          <CommandGroup>
            {options.map((option, index) => (
              <CommandItem
                key={option.key}
                value={option.title}
                onSelect={() => {
                  selectOptionAndCleanUp(option);
                }}
                className={`flex items-center gap-2 ${
                  selectedIndex === index ? "bg-accent" : "!bg-transparent"
                }`}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
              >
                {option.icon}
                {option.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}

export function ComponentPickerMenuPlugin({
  baseOptions = [],
  dynamicOptionsFn,
}: {
  baseOptions?: ComponentPickerOption[];
  dynamicOptionsFn?: ({
    queryString,
  }: {
    queryString: string;
  }) => ComponentPickerOption[];
}): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [modal, showModal] = useEditorModal();
  const [queryString, setQueryString] = useState<string | null>(null);

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch("/", {
    minLength: 0,
  });

  const options = useMemo(() => {
    if (!queryString) {
      return baseOptions;
    }

    const regex = new RegExp(queryString, "i");

    return [
      ...(dynamicOptionsFn?.({ queryString }) || []),
      ...baseOptions.filter(
        (option) =>
          regex.test(option.title) ||
          option.keywords.some((keyword) => regex.test(keyword)),
      ),
    ];
  }, [baseOptions, dynamicOptionsFn, queryString]);

  const onSelectOption = useCallback(
    (
      selectedOption: ComponentPickerOption,
      nodeToRemove: TextNode | null,
      closeMenu: () => void,
      matchingString: string,
      // eslint-disable-next-line max-params
    ) => {
      editor.update(() => {
        nodeToRemove?.remove();
        selectedOption.onSelect(matchingString, editor, showModal);
        closeMenu();
      });
    },
    [editor, showModal],
  );

  return (
    <>
      {modal}
      <LexicalTypeaheadMenuPlugin
        triggerFn={checkForTriggerMatch}
        onQueryChange={setQueryString}
        onSelectOption={onSelectOption}
        options={options}
        menuRenderFn={(
          anchorElementRef,
          { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex },
        ) => {
          return anchorElementRef.current && options.length
            ? createPortal(
                <ComponentPickerMenu
                  selectedIndex={selectedIndex}
                  setHighlightedIndex={setHighlightedIndex}
                  options={options}
                  selectOptionAndCleanUp={selectOptionAndCleanUp}
                />,
                anchorElementRef.current,
              )
            : null;
        }}
      />
    </>
  );
}
