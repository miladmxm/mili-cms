export const mediaTypes = ["audio", "document", "image", "video"] as const;
export type MediaTypes = (typeof mediaTypes)[number];
