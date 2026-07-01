import {
  BucketAlreadyExists,
  BucketAlreadyOwnedByYou,
  CreateBucketCommand,
  DeleteObjectCommand,
  PutBucketPolicyCommand,
  PutObjectCommand,
  S3Client,
  waitUntilBucketExists,
} from "@aws-sdk/client-s3";
import { join as pathJoin } from "node:path";

import type { MediaTypes } from "@/services/media/type";

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

const applyPublicReadPolicy = async (bucketName: string) => {
  const bucketPolicy = {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "PublicRead",
        Effect: "Allow",
        Principal: "*",
        Action: ["s3:GetObject"],
        Resource: [`arn:aws:s3:::${bucketName}/*`],
      },
    ],
  };

  await s3.send(
    new PutBucketPolicyCommand({
      Bucket: bucketName,
      Policy: JSON.stringify(bucketPolicy),
    }),
  );
};

interface WriteFileParameters {
  file: File;
  dir: string;
  type: MediaTypes;
  name: string;
}

export const ensureBucket = async () => {
  const bucketName = env.S3_BUCKET;

  try {
    const { Location } = await s3.send(
      new CreateBucketCommand({
        ACL: "public-read",
        Bucket: bucketName,
      }),
    );

    await waitUntilBucketExists(
      {
        client: s3,
        maxWaitTime: 10,
      },
      { Bucket: bucketName },
    );
    await applyPublicReadPolicy(bucketName);
    console.log(`Bucket created with location ${Location}`);
  } catch (caught) {
    if (caught instanceof BucketAlreadyOwnedByYou) {
      await applyPublicReadPolicy(bucketName);
      console.log(`Bucket "${bucketName}" already exists.`);
    } else if (caught instanceof BucketAlreadyExists) {
      throw new Error(
        `The bucket "${bucketName}" already exists in another AWS account. Bucket names must be globally unique.`,
      );
    } else {
      throw caught;
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
      ACL: "public-read",
    }),
  );
  return pathKey;
};

export const deleteFile = async (url: string) => {
  await s3.send(new DeleteObjectCommand({ Bucket: env.S3_BUCKET, Key: url }));
};
