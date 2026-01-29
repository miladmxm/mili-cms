import { useCurrentEditor } from "@tiptap/react";

import { Button } from "../../ui/button";

const AddImage = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return;
  const onClickHandler = () => {
    editor
      .chain()
      .focus()
      .setImage({
        src: "http://localhost:9000/uploads/1-8-2026/image/80862b88-09e1-426e-a8d0-e922850a3cc6ame_21:28:09.png",
        alt: "hellooooo",
        height: 200,
      })
      .run();
  };
  return (
    <>
      <Button onClick={onClickHandler}> add</Button>
      <Button
        onClick={() => {
          editor
            .chain()
            .focus()
            .setNode("image", { "data-align": "left" })
            .run();
        }}
      >
        left
      </Button>
    </>
  );
};

export default AddImage;
