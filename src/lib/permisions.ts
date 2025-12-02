import { createAccessControl } from "better-auth/plugins/access";

const statements = {
  customer: ["create", "read", "update", "delete", "ban"],
  product: ["create", "read", "update", "delete"],
  blog: ["create", "read", "update", "delete"],
  comment: ["create", "read", "update", "delete", "spam"],
  settings: ["read", "update"],
} as const;

const ac = createAccessControl(statements);

export const roles = {
  customer: ac.newRole({
    product: ["read"],
    blog: ["read"],
    comment: ["read", "create"],
  }),

  moderator: ac.newRole({
    customer: ["read"],
    product: ["read", "create", "update", "delete"],
    blog: ["read", "create", "update", "delete"],
    settings: ["read"],
    comment: ["spam", "delete", "read", "update", "create"],
  }),

  admin: ac.newRole({
    blog: ["create", "read", "update", "delete"],
    product: ["create", "read", "update", "delete"],
    customer: ["create", "read", "update", "delete", "ban"],
    comment: ["create", "read", "update", "delete", "spam"],
    settings: ["read", "update"],
  }),
};

export { ac };
