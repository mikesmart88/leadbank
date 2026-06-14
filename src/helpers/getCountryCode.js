import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

countries.registerLocale(en);

export const getCountryCode = (countryName) => {
  return countries.getAlpha2Code(countryName, "en") || "";
};