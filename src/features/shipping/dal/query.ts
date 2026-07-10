import {
  dalDbOperation,
  dalRequireAuth,
  dalVerifySuccess,
} from "@/dal/helpers";
import * as addressService from "@/services/shipping/address.service";

export const getUserAddress = async () =>
  dalVerifySuccess(
    await dalRequireAuth(
      ({ id }) => dalDbOperation(() => addressService.getUserAddresses(id)),
      {
        address: ["read"],
      },
    ),
  );
