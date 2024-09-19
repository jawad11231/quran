import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";
import ar from "./locales/ar.json";
import en from "./locales/en.json";
export const deviceLanguage = getLocales()?.[0]?.languageCode ?? "ar";

const resources = {
  en: en,
  ar: ar,
};

i18n.use(initReactI18next).init({
  resources,
  compatibilityJSON: "v3",
  lng: deviceLanguage,
  fallbackLng: "ar",
  supportedLngs: ["ar", "en"],
  interpolation: {
    escapeValue: false,
  },
});

I18nManager.allowRTL(true);

i18n.on("languageChanged", (lng) => {
  if (lng === "ar") {
    I18nManager.forceRTL(true);
    I18nManager.getConstants().isRTL = true;
    I18nManager.doLeftAndRightSwapInRTL = false;
  } else {
    I18nManager.forceRTL(false);
    I18nManager.getConstants().isRTL = false;
    I18nManager.doLeftAndRightSwapInRTL = true;
  }
});

export default i18n;

// Reference:

// in layouts just add import i18n from "@/i18n/i18n"; in the top of the file
//   const { t } = useTranslation("home");
// expmple for changing the language
//   <TouchableOpacity
//             onPress={() => {
//                 i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
//               }}
//             >
//               <Text>ar or en</Text>
//             </TouchableOpacity>
