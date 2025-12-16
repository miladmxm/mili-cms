import fs from "fs/promises";
import { join as pathJoin } from "node:path";

const BASE_DIR = pathJoin(process.cwd(), "src", "uploads");

const mergeWitBaseDir = (...paths: string[]) => pathJoin(BASE_DIR, ...paths);

export const makeDir = async (...paths: string[]) => {
  const path = mergeWitBaseDir(...paths);
  await fs.mkdir(path, { recursive: true });
  return path;
};

export const fileToBuffer = async (f: File) => {
  const arrbuf = await f.arrayBuffer();
  const buffer = Buffer.from(arrbuf);
  return buffer;
};

interface WriteFileParameters {
  dir: string;
  name: string;
  file: File;
  type: string;
}

export const writeFile = async ({
  dir,
  file,
  type,
  name,
}: WriteFileParameters) => {
  const makedDir = await makeDir(dir, type);
  const fullPath = pathJoin(makedDir, name);
  await fs.writeFile(fullPath, await fileToBuffer(file));
  return fullPath;
};
