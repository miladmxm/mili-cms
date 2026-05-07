import type { MediaTypes } from "@/services/media/type";

type MimeKey = `${string}/${string}`;

type MimeTypes = Record<MediaTypes, Record<MimeKey, string[]>>;

export const MIMETYPES = {
  audio: {
    "audio/aac": [".acc"],
    "audio/mp4": [".mp4", "mpg4"],
    "audio/mpeg": [".mp1", ".mp2", ".mp3"],
  },
  document: {
    "text/plain": [
      ".conf",
      ".def",
      ".diff",
      ".in",
      ".ksh",
      ".list",
      ".log",
      ".pl",
      ".text",
      ".txt",
    ],
    "application/pdf": [".pdf"],
    "application/msword": [".doc", ".dot", ".wiz"],
    "application/vnd.ms-excel": [
      ".xla",
      ".xlb",
      ".xlc",
      ".xlm",
      ".xls",
      ".xlt",
      ".xlw",
    ],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      [".pptx"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
      ".xlsx",
    ],
  },
  image: {
    "image/jpeg": [
      "jpe",
      ".jpeg",
      ".jpg",
      ".pjpg",
      ".jfif",
      ".jfif-tbnl",
      ".jif",
    ],
    "image/png": [".png"],
    "image/webp": [".webp"],
    "image/gif": [".gif"],
  },
  video: {
    "video/mp4": [".mp4", ".mp4v", ".mpg4"],
    "video/webm": [".webm"],
  },
} as const satisfies MimeTypes;

export const mimeKeys = (name: keyof typeof MIMETYPES) => {
  return Object.keys(MIMETYPES[name]) as MimeKey[];
};

export const MimeValues = (name?: (keyof typeof MIMETYPES)[]) => {
  if (!name) return {};
  const values: Record<string, string[]> = {};
  name.forEach((n) => {
    values[n] = Object.values(MIMETYPES[n]).flat();
  });
  return values;
};
