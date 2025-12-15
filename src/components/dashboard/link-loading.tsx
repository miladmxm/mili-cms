import { useLinkStatus } from "next/link";

import { Spinner } from "./ui/spinner";

const LinkLoading = () => {
  const { pending } = useLinkStatus();
  if (!pending) return;

  return <Spinner className="link-loader-spinner absolute end-1" />;
};
export default LinkLoading;
