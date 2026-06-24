import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

countries.registerLocale(en);

const specialRegions = {
  Europe: "EU"
};

export const getCountryCode = (name) => {
  const specialRegions = {
    Europe: "EU"
  };

  if (specialRegions[name]) {
    return specialRegions[name];
  }

  return countries.getAlpha2Code(name, "en") || "";
};