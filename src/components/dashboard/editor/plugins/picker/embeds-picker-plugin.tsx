import { INSERT_EMBED_COMMAND } from "@lexical/react/LexicalAutoEmbedPlugin";

import type { CustomEmbedConfig } from "@/components/dashboard/editor/plugins/embeds/auto-embed-plugin";

import { EmbedConfigs } from "@/components/dashboard/editor/plugins/embeds/auto-embed-plugin";
import { ComponentPickerOption } from "@/components/dashboard/editor/plugins/picker/component-picker-option";

export function EmbedsPickerPlugin({
  embed,
}: {
  embed: "tweet" | "youtube-video";
}) {
  const embedConfig = EmbedConfigs.find(
    (config) => config.type === embed,
  ) as CustomEmbedConfig;

  return new ComponentPickerOption(`امبد ${embedConfig.contentName}`, {
    icon: embedConfig.icon,
    keywords: [...embedConfig.keywords, "embed"],
    onSelect: (_, editor) =>
      editor.dispatchCommand(INSERT_EMBED_COMMAND, embedConfig.type),
  });
}
