export const CURRENCY = ["IRR"] as const;
export const SENDING_METHODS = {
  storeSend: "ارسال توسط فروشگاه",
  personReception: "دریافت حضوری",
} as const;
export type SendingMethodKey = keyof typeof SENDING_METHODS;
export type SendingMethodValue = (typeof SENDING_METHODS)[SendingMethodKey];

export const BRAND_DATA = {
  phoneNumber: "0912 158 2449",
  address: {
    location: { lan: 1, lat: 3 },
    plain: "تهران ، نعمت آباد ، خیابان نور ، پلاک 43",
  },
} as const;
