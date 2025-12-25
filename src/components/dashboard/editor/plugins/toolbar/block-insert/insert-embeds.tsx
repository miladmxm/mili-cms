"use client";

import { INSERT_EMBED_COMMAND } from "@lexical/react/LexicalAutoEmbedPlugin";

import { useToolbarContext } from "@/components/dashboard/editor/context/toolbar-context";
import { EmbedConfigs } from "@/components/dashboard/editor/plugins/embeds/auto-embed-plugin";
import { SelectItem } from "@/components/dashboard/ui/select";

export function InsertEmbeds() {
  const { activeEditor } = useToolbarContext();
  return EmbedConfigs.map((embedConfig) => (
    <SelectItem
      className=""
      key={embedConfig.type}
      value={embedConfig.type}
      onPointerUp={() => {
        activeEditor.dispatchCommand(INSERT_EMBED_COMMAND, embedConfig.type);
      }}
    >
      <div className="flex items-center gap-1">
        {embedConfig.icon}
        <span>{embedConfig.contentName}</span>
      </div>
    </SelectItem>
  ));
}
