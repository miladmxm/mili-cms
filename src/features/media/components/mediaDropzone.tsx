"use client";

import type { MediaTypes } from "@/services/media/type";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/ui/card";
import { Separator } from "@/components/dashboard/ui/separator";
import { MimeValues } from "@/constant/mimeSupport";
import { cn } from "@/lib/utils";

import { useUpload } from "../hooks/useUpload";

const MediaDropzone = ({ acceptTypes }: { acceptTypes?: MediaTypes[] }) => {
  const { getInputProps, getRootProps, fileRejections } = useUpload(
    MimeValues(acceptTypes),
  );
  return (
    <Card
      className={cn("border-dashed text-center", {
        "border-destructive": fileRejections.length > 0,
      })}
      {...getRootProps()}
    >
      <CardContent>
        <input {...getInputProps()} />
        <CardHeader>
          <CardTitle>بارگذاری فایل</CardTitle>
        </CardHeader>
        <Separator className="my-6" />
        <CardContent>
          <CardDescription>
            برای بارگذاری فایل کلیک کنید یا بکشید و رها کنید
          </CardDescription>
          {fileRejections.map(({ errors }) => {
            return (
              <CardDescription
                className="text-destructive mt-6"
                key={errors[0].code + errors[0].message}
              >
                {errors[0].code}: {errors[0].message}
              </CardDescription>
            );
          })}
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default MediaDropzone;
