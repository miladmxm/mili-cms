import { NextResponse } from "next/server";

import { getSessionId, setSessionId } from "./lib/auth";

export default async function proxy() {
  const sessioId = await getSessionId();
  if (!sessioId) await setSessionId();
  return NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
