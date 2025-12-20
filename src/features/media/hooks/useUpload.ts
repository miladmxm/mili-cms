import type { FileError } from "react-dropzone";

import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";

import { fetchToUploadWithProgress } from "@/lib/uploadWithProgress";
import { useMediaStore } from "@/store/media.store";
import { validator } from "@/validations";

import { UploadMediaSchema } from "../validations";

const customDropzoneValidator = (
  file: File,
): FileError | readonly FileError[] | null => {
  const { errors, success } = validator(UploadMediaSchema, { file });
  if (success && !errors) return null;

  return {
    code: file.name,
    message: errors.file?.join("/n") ?? "فایل نامعتبر ",
  };
};

const createDataUrl = (file: File) => URL.createObjectURL(file);

export const useUpload = () => {
  const { addToUploadingMedias, setProgressById, removeFromUploadingMedias } =
    useMediaStore();
  const router = useRouter();
  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach(async (file) => {
      const inputsData = { file };
      const { output, success } = validator(UploadMediaSchema, inputsData);
      if (!success) return;
      const id = crypto.randomUUID();
      const { abort, send } = fetchToUploadWithProgress({
        data: inputsData,
        endPoint: "/api/media/upload",
        progressCb: (progress) => setProgressById(id, progress),
      });

      let storData: Parameters<typeof addToUploadingMedias>[0] = {
        name: file.name,
        type: output.type,
        id,
        progress: 0,
        abort,
      };
      if (output.type === "image") {
        storData = {
          ...storData,
          uri: createDataUrl(file),
        };
      }

      addToUploadingMedias(storData);
      try {
        await send();
        router.refresh();
      } catch (error) {
        console.log(error);
      } finally {
        removeFromUploadingMedias(id);
        if (storData.type === "image" && storData.uri)
          URL.revokeObjectURL(storData.uri);
      }
    });
  };
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    validator: customDropzoneValidator,
    multiple: true,
    maxFiles: 10,
  });

  return { getRootProps, getInputProps, fileRejections };
};
