"use client";
import { useDropzone } from "react-dropzone";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/ui/card";
import { Separator } from "@/components/dashboard/ui/separator";
import { fetchToUploadWithProgress } from "@/lib/uploadWithProgress";

const MediaDropzone = () => {
  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach(async (file) => {
      const { abort, send } = fetchToUploadWithProgress({
        data: { file },
        endPoint: "/api/media/upload",
        progressCb: console.log,
      });
      await send();
    });
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Card className="border-dashed text-center" {...getRootProps()}>
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
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default MediaDropzone;
