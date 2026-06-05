"use clinet";

import type { ComponentProps } from "react";

import dynamic from "next/dynamic";

const ShareButton = dynamic(() => import("./share"), { ssr: false });

const ShareButtonInSSR = (props: ComponentProps<typeof ShareButton>) => {
  return <ShareButton {...props} />;
};

export default ShareButtonInSSR;
