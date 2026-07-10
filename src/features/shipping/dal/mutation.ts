import type { CreateAddress } from "@/services/shipping/type";

import { dalDbOperation, dalRequireAuth } from "@/dal/helpers";
import * as addressService from "@/services/shipping/address.service";

export const createAddress = (data: Omit<CreateAddress, "userId">) =>
  dalRequireAuth(
    ({ id }) =>
      dalDbOperation(() =>
        addressService.createAddress({ ...data, userId: id }),
      ),
    { address: ["create"] },
  );
