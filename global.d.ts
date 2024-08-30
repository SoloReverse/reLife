import en from "./i18n/en.json";

type Messages = typeof en;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OPENAI_API_KEY: string;
      WHATSAPP_API_KEY: string;
      STRIPE_API_KEY: string;
      SECRET_API_KEY: string;
    }
  }
}
