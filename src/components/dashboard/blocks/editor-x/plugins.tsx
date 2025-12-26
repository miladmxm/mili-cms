import {
  CHECK_LIST,
  ELEMENT_TRANSFORMERS,
  MULTILINE_ELEMENT_TRANSFORMERS,
  TEXT_FORMAT_TRANSFORMERS,
  TEXT_MATCH_TRANSFORMERS,
} from "@lexical/markdown";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { useState } from "react";

import { ContentEditable } from "@/components/dashboard/editor/editor-ui/content-editable";
import { ActionsPlugin } from "@/components/dashboard/editor/plugins/actions/actions-plugin";
import { CharacterLimitPlugin } from "@/components/dashboard/editor/plugins/actions/character-limit-plugin";
import { ClearEditorActionPlugin } from "@/components/dashboard/editor/plugins/actions/clear-editor-plugin";
import { CounterCharacterPlugin } from "@/components/dashboard/editor/plugins/actions/counter-character-plugin";
import { EditModeTogglePlugin } from "@/components/dashboard/editor/plugins/actions/edit-mode-toggle-plugin";
import { ImportExportPlugin } from "@/components/dashboard/editor/plugins/actions/import-export-plugin";
import { MarkdownTogglePlugin } from "@/components/dashboard/editor/plugins/actions/markdown-toggle-plugin";
import { MaxLengthPlugin } from "@/components/dashboard/editor/plugins/actions/max-length-plugin";
import { ShareContentPlugin } from "@/components/dashboard/editor/plugins/actions/share-content-plugin";
import { SpeechToTextPlugin } from "@/components/dashboard/editor/plugins/actions/speech-to-text-plugin";
import { TreeViewPlugin } from "@/components/dashboard/editor/plugins/actions/tree-view-plugin";
import { AutoLinkPlugin } from "@/components/dashboard/editor/plugins/auto-link-plugin";
import { AutocompletePlugin } from "@/components/dashboard/editor/plugins/autocomplete-plugin";
import { CodeActionMenuPlugin } from "@/components/dashboard/editor/plugins/code-action-menu-plugin";
import { CodeHighlightPlugin } from "@/components/dashboard/editor/plugins/code-highlight-plugin";
import { ComponentPickerMenuPlugin } from "@/components/dashboard/editor/plugins/component-picker-menu-plugin";
import { ContextMenuPlugin } from "@/components/dashboard/editor/plugins/context-menu-plugin";
import { DragDropPastePlugin } from "@/components/dashboard/editor/plugins/drag-drop-paste-plugin";
import { DraggableBlockPlugin } from "@/components/dashboard/editor/plugins/draggable-block-plugin";
import { AutoEmbedPlugin } from "@/components/dashboard/editor/plugins/embeds/auto-embed-plugin";
import { TwitterPlugin } from "@/components/dashboard/editor/plugins/embeds/twitter-plugin";
import { YouTubePlugin } from "@/components/dashboard/editor/plugins/embeds/youtube-plugin";
import { EmojiPickerPlugin } from "@/components/dashboard/editor/plugins/emoji-picker-plugin";
import { EmojisPlugin } from "@/components/dashboard/editor/plugins/emojis-plugin";
import { FloatingLinkEditorPlugin } from "@/components/dashboard/editor/plugins/floating-link-editor-plugin";
import { FloatingTextFormatToolbarPlugin } from "@/components/dashboard/editor/plugins/floating-text-format-plugin";
import { ImagesPlugin } from "@/components/dashboard/editor/plugins/images-plugin";
import { KeywordsPlugin } from "@/components/dashboard/editor/plugins/keywords-plugin";
import { LayoutPlugin } from "@/components/dashboard/editor/plugins/layout-plugin";
import { LinkPlugin } from "@/components/dashboard/editor/plugins/link-plugin";
import { ListMaxIndentLevelPlugin } from "@/components/dashboard/editor/plugins/list-max-indent-level-plugin";
import { MentionsPlugin } from "@/components/dashboard/editor/plugins/mentions-plugin";
import { AlignmentPickerPlugin } from "@/components/dashboard/editor/plugins/picker/alignment-picker-plugin";
import { BulletedListPickerPlugin } from "@/components/dashboard/editor/plugins/picker/bulleted-list-picker-plugin";
import { CheckListPickerPlugin } from "@/components/dashboard/editor/plugins/picker/check-list-picker-plugin";
import { CodePickerPlugin } from "@/components/dashboard/editor/plugins/picker/code-picker-plugin";
import { ColumnsLayoutPickerPlugin } from "@/components/dashboard/editor/plugins/picker/columns-layout-picker-plugin";
import { DividerPickerPlugin } from "@/components/dashboard/editor/plugins/picker/divider-picker-plugin";
import { EmbedsPickerPlugin } from "@/components/dashboard/editor/plugins/picker/embeds-picker-plugin";
import { HeadingPickerPlugin } from "@/components/dashboard/editor/plugins/picker/heading-picker-plugin";
import { ImagePickerPlugin } from "@/components/dashboard/editor/plugins/picker/image-picker-plugin";
import { NumberedListPickerPlugin } from "@/components/dashboard/editor/plugins/picker/numbered-list-picker-plugin";
import { ParagraphPickerPlugin } from "@/components/dashboard/editor/plugins/picker/paragraph-picker-plugin";
import { QuotePickerPlugin } from "@/components/dashboard/editor/plugins/picker/quote-picker-plugin";
import {
  DynamicTablePickerPlugin,
  TablePickerPlugin,
} from "@/components/dashboard/editor/plugins/picker/table-picker-plugin";
import { TabFocusPlugin } from "@/components/dashboard/editor/plugins/tab-focus-plugin";
import { BlockFormatDropDown } from "@/components/dashboard/editor/plugins/toolbar/block-format-toolbar-plugin";
import { FormatBulletedList } from "@/components/dashboard/editor/plugins/toolbar/block-format/format-bulleted-list";
import { FormatCheckList } from "@/components/dashboard/editor/plugins/toolbar/block-format/format-check-list";
import { FormatCodeBlock } from "@/components/dashboard/editor/plugins/toolbar/block-format/format-code-block";
import { FormatHeading } from "@/components/dashboard/editor/plugins/toolbar/block-format/format-heading";
import { FormatNumberedList } from "@/components/dashboard/editor/plugins/toolbar/block-format/format-numbered-list";
import { FormatParagraph } from "@/components/dashboard/editor/plugins/toolbar/block-format/format-paragraph";
import { FormatQuote } from "@/components/dashboard/editor/plugins/toolbar/block-format/format-quote";
import { BlockInsertPlugin } from "@/components/dashboard/editor/plugins/toolbar/block-insert-plugin";
import { InsertColumnsLayout } from "@/components/dashboard/editor/plugins/toolbar/block-insert/insert-columns-layout";
import { InsertEmbeds } from "@/components/dashboard/editor/plugins/toolbar/block-insert/insert-embeds";
import { InsertHorizontalRule } from "@/components/dashboard/editor/plugins/toolbar/block-insert/insert-horizontal-rule";
import { InsertImage } from "@/components/dashboard/editor/plugins/toolbar/block-insert/insert-image";
import { InsertTable } from "@/components/dashboard/editor/plugins/toolbar/block-insert/insert-table";
import { ClearFormattingToolbarPlugin } from "@/components/dashboard/editor/plugins/toolbar/clear-formatting-toolbar-plugin";
import { CodeLanguageToolbarPlugin } from "@/components/dashboard/editor/plugins/toolbar/code-language-toolbar-plugin";
import { ElementFormatToolbarPlugin } from "@/components/dashboard/editor/plugins/toolbar/element-format-toolbar-plugin";
import { FontBackgroundToolbarPlugin } from "@/components/dashboard/editor/plugins/toolbar/font-background-toolbar-plugin";
import { FontColorToolbarPlugin } from "@/components/dashboard/editor/plugins/toolbar/font-color-toolbar-plugin";
import { FontFormatToolbarPlugin } from "@/components/dashboard/editor/plugins/toolbar/font-format-toolbar-plugin";
import { FontSizeToolbarPlugin } from "@/components/dashboard/editor/plugins/toolbar/font-size-toolbar-plugin";
import { HistoryToolbarPlugin } from "@/components/dashboard/editor/plugins/toolbar/history-toolbar-plugin";
import { LinkToolbarPlugin } from "@/components/dashboard/editor/plugins/toolbar/link-toolbar-plugin";
import { SubSuperToolbarPlugin } from "@/components/dashboard/editor/plugins/toolbar/subsuper-toolbar-plugin";
import { ToolbarPlugin } from "@/components/dashboard/editor/plugins/toolbar/toolbar-plugin";
import { EMOJI } from "@/components/dashboard/editor/transformers/markdown-emoji-transformer";
import { HR } from "@/components/dashboard/editor/transformers/markdown-hr-transformer";
import { IMAGE } from "@/components/dashboard/editor/transformers/markdown-image-transformer";
import { TABLE } from "@/components/dashboard/editor/transformers/markdown-table-transformer";
import { TWEET } from "@/components/dashboard/editor/transformers/markdown-tweet-transformer";
import { Separator } from "@/components/dashboard/ui/separator";
import { DirectionButtons } from "../../editor/plugins/toolbar/set-direction";

const placeholder = "از / برای دسترسی سریع و از : برای شکلک ها استفاده کنید";
const maxLength = 10000;

// eslint-disable-next-line max-lines-per-function
export function Plugins() {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className="relative ">
      <div className="rtl:**:dir-rtl">
        <ToolbarPlugin>
          {({ blockType }) => (
            <div className="vertical-align-middle sticky top-0 z-10 flex items-center gap-2 overflow-auto border-b p-1">
              <HistoryToolbarPlugin />
              <Separator className="!h-7" orientation="vertical" />
              <DirectionButtons />
              <Separator className="!h-7" orientation="vertical" />
              <BlockFormatDropDown>
                <FormatParagraph />
                <FormatHeading levels={["h1", "h2", "h3"]} />
                <FormatNumberedList />
                <FormatBulletedList />
                <FormatCheckList />
                <FormatCodeBlock />
                <FormatQuote />
              </BlockFormatDropDown>
              {blockType === "code" ? (
                <CodeLanguageToolbarPlugin />
              ) : (
                <>
                  <FontSizeToolbarPlugin />
                  <Separator className="!h-7" orientation="vertical" />
                  <FontFormatToolbarPlugin />
                  <Separator className="!h-7" orientation="vertical" />
                  <SubSuperToolbarPlugin />
                  <LinkToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
                  <Separator className="!h-7" orientation="vertical" />
                  <ClearFormattingToolbarPlugin />
                  <Separator className="!h-7" orientation="vertical" />
                  <FontColorToolbarPlugin />
                  <FontBackgroundToolbarPlugin />
                  <Separator className="!h-7" orientation="vertical" />
                  <ElementFormatToolbarPlugin />
                  <Separator className="!h-7" orientation="vertical" />
                  <BlockInsertPlugin>
                    <InsertHorizontalRule />
                    <InsertImage />
                    <InsertTable />
                    <InsertColumnsLayout />
                    <InsertEmbeds />
                  </BlockInsertPlugin>
                </>
              )}
            </div>
          )}
        </ToolbarPlugin>
      </div>
      <div className="relative">
        <AutoFocusPlugin />
        <RichTextPlugin
          contentEditable={
            <div className="">
              <div className="" ref={onRef}>
                <ContentEditable
                  className="ContentEditable__root relative block h-full min-h-72 overflow-auto px-8 py-4 focus:outline-none"
                  placeholder={placeholder}
                />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        <ClickableLinkPlugin />
        <CheckListPlugin />
        <HorizontalRulePlugin />
        <TablePlugin />
        <ListPlugin />
        <TabIndentationPlugin />
        <HashtagPlugin />
        <HistoryPlugin />

        <MentionsPlugin />
        <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
        <KeywordsPlugin />
        <EmojisPlugin />
        <ImagesPlugin />

        <LayoutPlugin />

        <AutoEmbedPlugin />
        <TwitterPlugin />
        <YouTubePlugin />

        <CodeHighlightPlugin />
        <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />

        <MarkdownShortcutPlugin
          transformers={[
            TABLE,
            HR,
            IMAGE,
            EMOJI,
            TWEET,
            CHECK_LIST,
            ...ELEMENT_TRANSFORMERS,
            ...MULTILINE_ELEMENT_TRANSFORMERS,
            ...TEXT_FORMAT_TRANSFORMERS,
            ...TEXT_MATCH_TRANSFORMERS,
          ]}
        />
        <TabFocusPlugin />
        <AutocompletePlugin />
        <AutoLinkPlugin />
        <LinkPlugin />

        <ComponentPickerMenuPlugin
          baseOptions={[
            ParagraphPickerPlugin(),
            HeadingPickerPlugin({ n: 1 }),
            HeadingPickerPlugin({ n: 2 }),
            HeadingPickerPlugin({ n: 3 }),
            TablePickerPlugin(),
            CheckListPickerPlugin(),
            NumberedListPickerPlugin(),
            BulletedListPickerPlugin(),
            QuotePickerPlugin(),
            CodePickerPlugin(),
            DividerPickerPlugin(),
            EmbedsPickerPlugin({ embed: "tweet" }),
            EmbedsPickerPlugin({ embed: "youtube-video" }),
            ImagePickerPlugin(),
            ColumnsLayoutPickerPlugin(),
            AlignmentPickerPlugin({ alignment: "left" }),
            AlignmentPickerPlugin({ alignment: "center" }),
            AlignmentPickerPlugin({ alignment: "right" }),
            AlignmentPickerPlugin({ alignment: "justify" }),
          ]}
          dynamicOptionsFn={DynamicTablePickerPlugin}
        />

        <ContextMenuPlugin />
        <DragDropPastePlugin />
        <EmojiPickerPlugin />

        <FloatingLinkEditorPlugin
          anchorElem={floatingAnchorElem}
          isLinkEditMode={isLinkEditMode}
          setIsLinkEditMode={setIsLinkEditMode}
        />
        <FloatingTextFormatToolbarPlugin
          anchorElem={floatingAnchorElem}
          setIsLinkEditMode={setIsLinkEditMode}
        />

        <ListMaxIndentLevelPlugin />
      </div>
      <ActionsPlugin>
        <div className="clear-both flex items-center justify-between gap-2 overflow-auto border-t p-1">
          <div className="flex flex-1 justify-start">
            <MaxLengthPlugin maxLength={maxLength} />
            <CharacterLimitPlugin charset="UTF-16" maxLength={maxLength} />
          </div>
          <div>
            <CounterCharacterPlugin charset="UTF-16" />
          </div>
          <div className="flex flex-1 justify-end">
            <SpeechToTextPlugin />
            <ShareContentPlugin />
            <ImportExportPlugin />
            <MarkdownTogglePlugin
              shouldPreserveNewLinesInMarkdown
              transformers={[
                TABLE,
                HR,
                IMAGE,
                EMOJI,
                TWEET,
                CHECK_LIST,
                ...ELEMENT_TRANSFORMERS,
                ...MULTILINE_ELEMENT_TRANSFORMERS,
                ...TEXT_FORMAT_TRANSFORMERS,
                ...TEXT_MATCH_TRANSFORMERS,
              ]}
            />
            <EditModeTogglePlugin />
            <ClearEditorActionPlugin />
            <ClearEditorPlugin />
            <TreeViewPlugin />
          </div>
        </div>
      </ActionsPlugin>
    </div>
  );
}
