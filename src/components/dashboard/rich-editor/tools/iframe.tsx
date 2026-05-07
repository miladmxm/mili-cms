import { useTiptap } from "@tiptap/react";
import { Check, SquareCode } from "lucide-react";
import { useRef, useState } from "react";
import * as v from "valibot";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Field, FieldError } from "../../ui/field";
import { Input } from "../../ui/input";

const URLschema = v.pipe(v.string(), v.url());

const validateUrl = (input?: string) => {
  const { success, output } = v.safeParse(URLschema, input);
  if (success) return output;
};

const getSafeURLfromInputValue = (input?: string) => {
  const isValidData = validateUrl(input);
  if (isValidData) return isValidData;

  const parser = new DOMParser();
  const dom = parser.parseFromString(input || "", "text/html");
  const iframeTag = dom.querySelector("iframe");
  if (!iframeTag) return;
  return validateUrl(iframeTag.src);
};

const AddIFrame = () => {
  const { editor, isReady } = useTiptap();
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  if (!editor || !isReady) return;

  const handleAddIframe = () => {
    const value = getSafeURLfromInputValue(inputRef.current?.value);

    if (value) {
      editor.chain().focus().setIframe({ src: value }).run();
      setOpen(false);
    } else {
      setErrorMessage("این محتوا قابل تبدیل شدن نیست");
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button dir="rtl" size="sm" type="button" variant="ghost">
          افزودن iFrame
          <SquareCode />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          افزودن کد <code>iFrame</code>
        </DialogTitle>
        <DialogDescription>
          آدرس تصویر یا صفحه یا ویدیو مدنظر را وارد کنید یا کد HTML که دارای تگ
          iframe است
        </DialogDescription>
        <div className="flex gap-1 flex-row">
          <Field aria-invalid={!!errorMessage} className="flex-auto">
            <Input
              ref={inputRef}
              onFocus={() => {
                setErrorMessage("");
              }}
            />
            {errorMessage && (
              <FieldError errors={[{ message: errorMessage }]} />
            )}
          </Field>
          <Field className="flex-1">
            <Button type="button" onClick={handleAddIframe}>
              <Check />
            </Button>
          </Field>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddIFrame;
