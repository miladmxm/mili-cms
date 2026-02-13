import type { Media, MediaTypes } from "@/services/media/type";

type One = MediaTypes;

type Two = `${MediaTypes}-${MediaTypes}`;

type Three = `${MediaTypes}-${MediaTypes}-${MediaTypes}`;

type Four = `${MediaTypes}-${MediaTypes}-${MediaTypes}-${MediaTypes}`;

export type MediaContextKey = Four | One | Three | Two;

export interface MediaContextState {
  media: Partial<Record<MediaContextKey, Promise<Media[]>>>;
}
