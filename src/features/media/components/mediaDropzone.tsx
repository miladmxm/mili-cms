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

const MediaDropzone = () => {
  const fetchToUpload = (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const req = new XMLHttpRequest();
    req.addEventListener("progress", (ev) => {
      console.log(ev);
    });
    req.addEventListener("loadend", () => {
      console.log(req.response, req.status);
    });
    req.open("POST", "/api/media/upload");
    req.send(form);
  };
  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach(async (file) => {
      fetchToUpload(file);
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
