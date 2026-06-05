import type { PropsWithChildren } from "react";

const ShareButton = ({
  children,
  ...shareProps
}: PropsWithChildren<Parameters<typeof navigator.share>[0]>) => {
  const handleShare = async () => {
    if (!window.navigator.share || !window.navigator.canShare()) {
      return;
    }

    try {
      await navigator.share(shareProps);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button onClick={handleShare} type="button">
      {children}
    </button>
  );
};

export default ShareButton;
