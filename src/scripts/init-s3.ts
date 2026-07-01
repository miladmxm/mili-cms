import { ensureBucket } from "@/lib/fileManager";

ensureBucket().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
