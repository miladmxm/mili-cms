"use server";

import { auth } from "@/lib/auth";

export const checkPhoneNumber = async (phoneNumber: string) => {
  auth.api.sendPhoneNumberOTP({ body: { phoneNumber } });
};
