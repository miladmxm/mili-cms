import env from "@/config/env";
import { auth } from "@/lib/auth";

await auth.api.createUser({
  body: {
    email: env.ADMIN_EMAIL,
    name: env.ADMIN_NAME ?? env.ADMIN_EMAIL,
    password: env.ADMIN_PASSWORD,
    role: "admin",
  },
});
