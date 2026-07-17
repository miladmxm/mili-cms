import saman from "@/assets/images/saman.png";
import zarinpal from "@/assets/images/zarinpal.png";

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

export const PAYMENT_GATEWAYS = {
  zarinpal: { label: "زرین پال", icon: zarinpal },
  saman: { label: "بانک سامان", icon: saman },
} as const;

export type PaymentGatewayKeys = keyof typeof PAYMENT_GATEWAYS;

export type PaymentGatewayValues =
  (typeof PAYMENT_GATEWAYS)[PaymentGatewayKeys];

export const PAYMENT_GATEWAYS_KEYS = Object.keys(
  PAYMENT_GATEWAYS,
) as PaymentGatewayKeys[];

export const PAYMENT_GATEWAYS_VALUES = Object.values(
  PAYMENT_GATEWAYS,
) as PaymentGatewayValues[];

export const TERMS_CONDITIONS = `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز ، و کاربردهای مدلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز ، و کاربردهای مد  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز ، و کاربردهای مد  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است.  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز ، و کاربردهای مدلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز ، و کاربردهای مد  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است`;
