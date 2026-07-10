import { cacheTag } from "next/cache";

import { CacheKeys } from "@/constant/cacheKeys";
import * as addressRepo from "@/repositories/address.repo";
import "server-only";

import type { CreateAddress } from "./type";

// * READ
export const getUserAddresses = async (userId: string) => {
  "use cache";

  cacheTag(`${CacheKeys.address}-${userId}`);
  return addressRepo.findAddressByUserId(userId);
};

// * CREATE
export const createAddress = async (address: CreateAddress) => {
  const [{ id }] = await addressRepo.createAddress(address);
  return id;
};
