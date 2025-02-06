import  en  from "./locales/en.json";
import  kh  from "./locales/kh.json";

export default defineI18nConfig(() => ({
    legacy: false,
    locale: "kh",
    messages: {
        en: en.data,
        kh: kh.data,
    },
}))