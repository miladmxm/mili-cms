type Inputs = Record<string, string | Blob>;

const addRecordsToFormData = (data: Inputs): FormData => {
  const form = new FormData();
  Object.keys(data).forEach((item) => form.append(item, data[item]));
  return form;
};

interface FetchToUploadParameters {
  data: Inputs;
  endPoint: string | URL;
  progressCb: (progress: number) => void;
}

export const fetchToUploadWithProgress = ({
  data,
  progressCb,
  endPoint,
}: FetchToUploadParameters) => {
  const req = new XMLHttpRequest();
  return {
    send: () =>
      new Promise((resolve, reject) => {
        const formData = addRecordsToFormData(data);

        req.upload.addEventListener("progress", (ev) => {
          progressCb((ev.loaded / ev.total) * 100);
        });

        req.addEventListener("loadend", resolve);
        req.addEventListener("error", reject);

        req.open("POST", endPoint);
        req.send(formData);
      }),
    abort: () => req.abort(),
  };
};
