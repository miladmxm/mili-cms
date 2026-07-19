import type { CreateAddress, CreateOrder } from "@/services/shipping/type";

import { dalDbOperation, dalRequireAuth } from "@/dal/helpers";
import * as addressService from "@/services/shipping/address.service";
import * as orderService from "@/services/shipping/order.service";
import "server-only";

export const createAddress = (data: Omit<CreateAddress, "userId">) =>
  dalRequireAuth(
    ({ id }) =>
      dalDbOperation(() =>
        addressService.createAddress({ ...data, userId: id }),
      ),
    { address: ["create"] },
  );

export const createOrder = (data: Omit<CreateOrder, "userId">) =>
  dalRequireAuth(
    ({ id }) =>
      dalDbOperation(() => orderService.createOrder({ ...data, userId: id })),
    { address: ["read"] },
  );
