import {
  CreateBucketCommand,
  HeadBucketCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { join as pathJoin } from "node:path";

import type { MediaTypes } from "@/features/type";

import env from "@/config/env";

const s3 = new S3Client({
  region: env.S3_REGION,
  endpoint: env.S3_ENDPOINT,
  credentials: {
    accessKeyId: env.S3_USER,
    secretAccessKey: env.S3_PASSWORD,
  },
  forcePathStyle: true,
});
interface WriteFileParameters {
  file: File;
  dir: string;
  type: MediaTypes;
  name: string;
}
export const ensureBucket = async () => {
  try {
    await s3.send(new HeadBucketCommand({ Bucket: env.S3_BUCKET }));
  } catch (err) {
    if (
      err instanceof Error &&
      "$metadata" in err &&
      err.$metadata &&
      typeof err.$metadata === "object" &&
      "httpStatusCode" in err.$metadata &&
      err.$metadata?.httpStatusCode === 404
    ) {
      await s3.send(
        new CreateBucketCommand({
          Bucket: env.S3_BUCKET,
        }),
      );
    } else {
      throw err;
    }
  }
};

export const writeFile = async ({
  dir,
  file,
  name,
  type,
}: WriteFileParameters) => {
  const pathKey = pathJoin(dir, type, name);

  const buffer = Buffer.from(await file.arrayBuffer());

  await s3.send(
    new PutObjectCommand({
      Bucket: env.S3_BUCKET,
      Key: pathKey,
      Body: buffer,
      ContentType: file.type,
    }),
  );
  return pathKey;
};
